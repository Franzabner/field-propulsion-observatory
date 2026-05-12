#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const {
  estimateSpeed,
  estimateAcceleration,
  estimateRangeDependentSpeed,
  summarizeMissingMetadata,
  classifyConfidenceFromMetadata,
  generateUncertaintyNotes,
  scoreKnownCauseScreening,
  mapHypothesisBoundary,
  refuseUnsupportedPropulsionConclusion,
  buildSimulationLedger
} = require("../sim/src");

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function validateScenario(scenario) {
  const errors = [];
  if (!scenario.scenario_id) errors.push("scenario_id is required");
  if (!scenario.scenario_name) errors.push("scenario_name is required");
  if (scenario.synthetic !== true) errors.push("scenario must be synthetic");
  if (!Array.isArray(scenario.assumptions) || scenario.assumptions.length === 0) {
    errors.push("at least one declared assumption is required");
  }
  if (!scenario.sensor_metadata || typeof scenario.sensor_metadata !== "object") {
    errors.push("sensor_metadata object is required");
  }
  if (errors.length > 0) {
    throw new Error(`Invalid scenario: ${errors.join("; ")}`);
  }
}

function buildTrajectory(scenario) {
  const metadata = scenario.sensor_metadata;
  const trajectoryInput = scenario.trajectory_input || {};
  const range_m = metadata.target_range_m;
  const angular_rate_deg_s = trajectoryInput.angular_rate_deg_s;
  const duration_s = trajectoryInput.duration_s;
  const delta_v_m_s = trajectoryInput.delta_v_m_s;
  const distance_m = Number.isFinite(trajectoryInput.distance_m)
    ? trajectoryInput.distance_m
    : null;
  const rangeSpeed = estimateRangeDependentSpeed(angular_rate_deg_s, range_m);
  const directSpeed = estimateSpeed(distance_m, duration_s);
  const speed_m_s = rangeSpeed ?? directSpeed;

  return {
    range_m: Number.isFinite(range_m) ? range_m : null,
    angular_rate_deg_s: Number.isFinite(angular_rate_deg_s) ? angular_rate_deg_s : null,
    distance_m,
    duration_s: Number.isFinite(duration_s) ? duration_s : null,
    speed_m_s,
    delta_v_m_s: Number.isFinite(delta_v_m_s) ? delta_v_m_s : null,
    acceleration_m_s2: estimateAcceleration(delta_v_m_s, duration_s),
    range_dependent: Number.isFinite(rangeSpeed)
  };
}

function runSimulation(scenarioPath) {
  const scenario = readJson(scenarioPath);
  validateScenario(scenario);

  const missing_metadata = summarizeMissingMetadata(scenario.sensor_metadata);
  const confidence = classifyConfidenceFromMetadata(scenario.sensor_metadata);
  const trajectory = buildTrajectory(scenario);
  const uncertainty_notes = generateUncertaintyNotes(scenario.sensor_metadata, trajectory);
  const known_cause_screening = scoreKnownCauseScreening(scenario);
  const hypothesis_boundary = mapHypothesisBoundary(confidence);
  const refusal = refuseUnsupportedPropulsionConclusion();
  const ledger = buildSimulationLedger({
    scenario,
    missing_metadata,
    confidence,
    trajectory,
    uncertainty_notes,
    known_cause_screening,
    hypothesis_boundary,
    refusal
  });

  const outputDir = path.join(process.cwd(), "sim", "outputs");
  fs.mkdirSync(outputDir, { recursive: true });
  const scenarioBaseName = path.basename(scenarioPath).replace(/\.scenario\.json$/, "");
  const outputPath = path.join(outputDir, `${scenarioBaseName}.ledger.json`);
  fs.writeFileSync(outputPath, `${JSON.stringify(ledger, null, 2)}\n`);

  console.log(`scenario: ${scenario.scenario_name}`);
  console.log(`assumptions count: ${scenario.assumptions.length}`);
  console.log(`missing metadata: ${missing_metadata.length ? missing_metadata.join(", ") : "none"}`);
  console.log(`confidence: ${confidence}`);
  console.log("estimated trajectory:");
  console.log(`  range_m: ${trajectory.range_m ?? "unknown"}`);
  console.log(`  angular_rate_deg_s: ${trajectory.angular_rate_deg_s ?? "unknown"}`);
  console.log(`  duration_s: ${trajectory.duration_s ?? "unknown"}`);
  console.log(`  speed_m_s: ${trajectory.speed_m_s === null ? "unsupported" : trajectory.speed_m_s.toFixed(4)}`);
  console.log(`  acceleration_m_s2: ${trajectory.acceleration_m_s2 === null ? "unsupported" : trajectory.acceleration_m_s2.toFixed(4)}`);
  console.log(`boundary language: ${hypothesis_boundary}`);
  console.log(`ledger: ${outputPath}`);
}

const scenarioPath = process.argv[2];

if (!scenarioPath) {
  console.error("Usage: node scripts/run-simulation.js <scenario-json-path>");
  process.exit(1);
}

runSimulation(scenarioPath);


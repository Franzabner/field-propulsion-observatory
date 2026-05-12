function scoreKnownCauseScreening(scenario = {}) {
  const metadata = scenario.sensor_metadata || {};
  const notes = [];

  notes.push({
    category: "sensor_artifact",
    status: metadata.compression_history === "unknown" ? "insufficient_data" : "unassessed",
    notes: "Compression, stabilization, gain, and processing artifacts must be screened before motion claims are strengthened."
  });

  notes.push({
    category: "bird_insect",
    status: Number.isFinite(metadata.target_range_m) ? "unassessed" : "plausible",
    notes: "Near-field objects remain plausible until range is measured or bounded."
  });

  notes.push({
    category: "aircraft_drone_balloon_satellite",
    status: "unassessed",
    notes: "Known airborne and orbital causes require timing, range, weather, wind, and track comparison."
  });

  return notes;
}

function mapHypothesisBoundary(confidence) {
  if (confidence === "multi_sensor_supported" || confidence === "bounded_reconstruction") {
    return "Known-cause screening may proceed, but speculative propulsion remains unsupported without calibrated acceleration, power, heat, and control evidence.";
  }
  return "The evidence package is insufficient for propulsion analysis; continue metadata recovery, geometry bounding, and known-cause screening.";
}

function refuseUnsupportedPropulsionConclusion() {
  return "No exotic propulsion conclusion is supported. Field propulsion and zero-point language remain speculative hypothesis vocabulary only.";
}

module.exports = {
  scoreKnownCauseScreening,
  mapHypothesisBoundary,
  refuseUnsupportedPropulsionConclusion
};


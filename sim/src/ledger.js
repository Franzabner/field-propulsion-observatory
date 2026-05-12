function roundNumber(value) {
  if (!Number.isFinite(value)) {
    return null;
  }
  return Number(value.toFixed(4));
}

function buildSimulationLedger({
  scenario,
  missing_metadata,
  confidence,
  trajectory,
  uncertainty_notes,
  known_cause_screening,
  hypothesis_boundary,
  refusal
}) {
  return {
    ledger_id: `ledger-${scenario.scenario_id}`,
    scenario_id: scenario.scenario_id,
    scenario_name: scenario.scenario_name,
    synthetic: true,
    generated_at_utc: new Date().toISOString(),
    assumptions: scenario.assumptions,
    missing_metadata,
    confidence,
    trajectory: {
      range_m: roundNumber(trajectory.range_m),
      angular_rate_deg_s: roundNumber(trajectory.angular_rate_deg_s),
      distance_m: roundNumber(trajectory.distance_m),
      duration_s: roundNumber(trajectory.duration_s),
      speed_m_s: roundNumber(trajectory.speed_m_s),
      delta_v_m_s: roundNumber(trajectory.delta_v_m_s),
      acceleration_m_s2: roundNumber(trajectory.acceleration_m_s2),
      range_dependent: trajectory.range_dependent
    },
    uncertainty_notes,
    known_cause_screening,
    hypothesis_boundary,
    propulsion_conclusion_refusal: refusal
  };
}

module.exports = {
  buildSimulationLedger
};


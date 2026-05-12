const { degreesToRadians } = require("./geometry");

function estimateSpeed(distance_m, duration_s) {
  if (!Number.isFinite(distance_m) || !Number.isFinite(duration_s) || duration_s <= 0) {
    return null;
  }
  return distance_m / duration_s;
}

function estimateAcceleration(delta_v_m_s, duration_s) {
  if (!Number.isFinite(delta_v_m_s) || !Number.isFinite(duration_s) || duration_s <= 0) {
    return null;
  }
  return delta_v_m_s / duration_s;
}

function estimateRangeDependentSpeed(angular_rate_deg_s, range_m) {
  if (!Number.isFinite(angular_rate_deg_s) || !Number.isFinite(range_m) || range_m <= 0) {
    return null;
  }
  return degreesToRadians(angular_rate_deg_s) * range_m;
}

module.exports = {
  estimateSpeed,
  estimateAcceleration,
  estimateRangeDependentSpeed
};


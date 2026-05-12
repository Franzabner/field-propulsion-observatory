function degreesToRadians(degrees) {
  if (typeof degrees !== "number" || Number.isNaN(degrees)) {
    throw new TypeError("degrees must be a number");
  }
  return degrees * (Math.PI / 180);
}

function angularSizeToLinearSize(angular_size_deg, range_m) {
  if (!Number.isFinite(angular_size_deg) || !Number.isFinite(range_m) || range_m <= 0) {
    return null;
  }
  return 2 * range_m * Math.tan(degreesToRadians(angular_size_deg) / 2);
}

function estimateGroundDistanceFromElevation(elevation_deg, altitude_m) {
  if (!Number.isFinite(elevation_deg) || !Number.isFinite(altitude_m) || altitude_m <= 0) {
    return null;
  }
  const elevationRad = degreesToRadians(elevation_deg);
  const tangent = Math.tan(elevationRad);
  if (tangent <= 0) {
    return null;
  }
  return altitude_m / tangent;
}

function basicLineOfSightNote({ range_m, elevation_deg, platform_velocity_known } = {}) {
  const notes = [];
  if (!Number.isFinite(range_m)) {
    notes.push("Target range is not measured; size, speed, acceleration, and energy remain range-dependent.");
  }
  if (!Number.isFinite(elevation_deg)) {
    notes.push("Elevation is missing; line-of-sight geometry cannot be independently reconstructed.");
  }
  if (platform_velocity_known !== true) {
    notes.push("Platform velocity is not known; apparent target motion may include observer motion.");
  }
  if (notes.length === 0) {
    notes.push("Basic line-of-sight fields are present, subject to calibration and custody review.");
  }
  return notes;
}

module.exports = {
  degreesToRadians,
  angularSizeToLinearSize,
  estimateGroundDistanceFromElevation,
  basicLineOfSightNote
};


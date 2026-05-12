const REQUIRED_METADATA = [
  ["timestamp_quality", "timestamp quality"],
  ["platform_location_known", "platform location"],
  ["platform_velocity_known", "platform velocity"],
  ["sensor_type", "sensor type"],
  ["field_of_view_deg", "field of view"],
  ["frame_rate_fps", "frame rate"],
  ["target_range_m", "target range"],
  ["azimuth_deg", "azimuth"],
  ["elevation_deg", "elevation"],
  ["chain_of_custody", "chain of custody"],
  ["compression_history", "compression history"]
];

function isMissingValue(value) {
  return value === null || value === undefined || value === "" || value === "unknown" || value === false;
}

function summarizeMissingMetadata(metadata = {}) {
  return REQUIRED_METADATA
    .filter(([key]) => isMissingValue(metadata[key]))
    .map(([, label]) => label);
}

function classifyConfidenceFromMetadata(metadata = {}) {
  const missing = summarizeMissingMetadata(metadata);
  const hasRange = Number.isFinite(metadata.target_range_m);
  const hasTiming = Number.isFinite(metadata.frame_rate_fps) || metadata.timestamp_quality === "instrument_recorded";
  const hasPlatform = metadata.platform_location_known === true && metadata.platform_velocity_known === true;
  const hasCorrelation = metadata.radar_correlation === "present" || metadata.infrared_correlation === "present";

  if (!hasRange || !hasTiming || missing.length >= 5) {
    return "insufficient_data";
  }
  if (hasRange && hasTiming && hasPlatform && hasCorrelation && missing.length <= 1) {
    return "multi_sensor_supported";
  }
  if (hasRange && hasTiming && hasPlatform && missing.length <= 3) {
    return "bounded_reconstruction";
  }
  return "low_confidence_reconstruction";
}

function generateUncertaintyNotes(metadata = {}, estimates = {}) {
  const notes = [];
  const missing = summarizeMissingMetadata(metadata);

  if (missing.length > 0) {
    notes.push(`Missing metadata: ${missing.join(", ")}.`);
  }
  if (!Number.isFinite(metadata.target_range_m)) {
    notes.push("Unknown range creates unknown size, speed, acceleration, and energy.");
  }
  if (estimates.range_dependent === true) {
    notes.push("The speed estimate is range-dependent and must not be treated as measured speed.");
  }
  if (!Number.isFinite(estimates.acceleration_m_s2)) {
    notes.push("Acceleration is not supportable from the declared inputs.");
  }
  notes.push("Unresolved is a valid result.");
  return notes;
}

module.exports = {
  summarizeMissingMetadata,
  classifyConfidenceFromMetadata,
  generateUncertaintyNotes
};


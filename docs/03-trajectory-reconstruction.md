# Trajectory Reconstruction

Trajectory reconstruction converts sensor observations into bounded motion estimates. It must not infer more than the geometry supports.

## Dependency Chain

If range is unknown, size is unknown.

If size is unknown, speed is unknown.

If speed is unknown, acceleration is unknown.

If acceleration is unknown, propulsion cannot be inferred.

## Minimum Inputs

| Input | Required use |
| --- | --- |
| Time interval | Converts displacement into velocity. |
| Angular displacement or line-of-sight track | Defines apparent motion. |
| Range or range bound | Converts angular motion into physical displacement. |
| Platform state | Removes observer motion from target motion. |
| Sensor mode and field of view | Converts pixels or angular rate into geometry. |
| Calibration status | Determines whether estimates are bounded or speculative. |

## Reconstruction Outputs

- Angular rate.
- Range-dependent speed.
- Range-dependent acceleration.
- Missing metadata list.
- Confidence classification.
- Boundary language.

## Non-Output

The reconstruction process must not output exotic propulsion as a conclusion. It may state that known-cause screening is incomplete or that a speculative hypothesis would require evidence not present in the current record.


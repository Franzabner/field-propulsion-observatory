# Sensor Chain

The sensor chain describes what must be known before an observation can become a reconstruction problem.

## Required Metadata

| Field | Why it matters |
| --- | --- |
| Timestamp | Enables frame timing, correlation, and clock drift checks. |
| Platform location | Establishes observer position and geometry. |
| Platform velocity | Separates target motion from platform motion. |
| Sensor type | Distinguishes optical, infrared, radar, acoustic, or other modes. |
| Sensor mode | Affects field of view, tracking, stabilization, gain, and processing. |
| Focal length / field of view | Converts angular motion into possible physical motion. |
| Frame rate | Controls velocity and acceleration estimates from visual media. |
| Target range | Converts apparent motion into size, speed, acceleration, and energy bounds. |
| Azimuth/elevation | Supports line-of-sight geometry and triangulation. |
| Weather | Screens cloud, wind, visibility, thermal, and atmospheric effects. |
| Wind | Screens balloon, debris, aircraft drift, and atmospheric transport. |
| Radar correlation | Provides independent range/range-rate support when calibrated. |
| Infrared correlation | Supports thermal signature analysis when calibrated. |
| Optical correlation | Supports visual identity and angular track comparison. |
| Chain of custody | Preserves provenance and reviewability. |
| Compression history | Screens artifacts, frame interpolation, metadata loss, and edits. |

## Metadata Quality

Metadata can be absent, reported, estimated, instrument-recorded, calibrated, or independently verifiable. The confidence label must reflect the weakest critical link.

## Public-Safe Rule

If a field cannot be disclosed publicly, the public report must state that the reconstruction is limited by unavailable metadata rather than implying a propulsion conclusion.


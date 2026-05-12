# Motion Claim Taxonomy

Motion claims should be classified by required data, common false positives, and minimum evidence threshold.

| Claim | Required data | Common false positives | Minimum evidence threshold |
| --- | --- | --- | --- |
| Hovering | Range, wind, platform motion, stabilized line of sight, duration. | Balloon drift, distant aircraft, camera stabilization, parallax. | Bounded range plus platform state and wind context. |
| Instantaneous acceleration | Frame timing, range, range-rate, continuous track identity. | Camera pan, zoom jump, dropped frames, rolling shutter, range error. | Calibrated timing and multi-frame range/range-rate support. |
| Sharp angular turn | Platform motion, target range, track continuity, frame timing. | Observer maneuver, gimbal motion, parallax, tracking loss. | Known platform state and reconstructable track. |
| Silent high-speed transit | Range, acoustic environment, altitude, weather, timing. | Distant aircraft, windborne object, perspective compression. | Bounded range and independent timing evidence. |
| No visible exhaust | Sensor band, exposure, range, lighting, expected plume model. | Low contrast, distance, viewing angle, non-jet object. | Sensor capability matched to expected signature. |
| No thermal plume | Infrared mode, gain, calibration, range, atmospheric absorption. | Saturation, auto-gain, low emissivity, distance. | Calibrated IR metadata and known sensitivity. |
| Transmedium behavior | Continuous track across media boundary, range, timing, splash/thermal/radar data. | Track discontinuity, separate objects, reflection, wave/glare. | Multi-sensor continuity with calibrated timing. |
| Formation behavior | Multiple object tracks, range, relative geometry, wind/platform data. | Birds, balloons, drones, aircraft lights, sensor artifacts. | Correlated tracks with stable identity and bounded range. |
| Apparent splitting/merging | Frame-level media, compression history, focus, glare, tracking. | Blooming, bokeh, compression, autofocus, overlay artifacts. | Original media plus optics metadata. |
| Radar-only track | Radar mode, calibration, clutter environment, range/range-rate, operator notes. | Clutter, multipath, spoofing, atmospheric ducting, processing artifact. | Calibrated radar record with screening. |
| Infrared-only signature | IR mode, calibration, gain, target range, thermal background. | Birds, aircraft, reflections, sensor noise, hot pixels. | Calibrated IR metadata and track continuity. |
| Optical-only object | FOV, focal length, frame rate, range, compression, platform motion. | Insect, bird, balloon, satellite, glare, parallax. | Bounded range or independent correlation. |

## Review Rule

A motion label is not a propulsion label. Claims about motion require geometry; claims about propulsion require motion plus power, heat, control, and alternative-cause screening.


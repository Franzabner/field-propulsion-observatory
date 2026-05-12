# Simulation Engine

The simulation engine is intentionally lightweight. It demonstrates the public reasoning pipeline without claiming to reconstruct real classified cases or prove exotic propulsion.

## Purpose

- Load a declared synthetic scenario.
- Validate that assumptions are present.
- Compute simple range-dependent speed where range and angular rate exist.
- Compute simple acceleration where velocity change and duration exist.
- Report missing metadata.
- Emit a simulation ledger.
- Refuse unsupported propulsion conclusions.

## Run

```bash
npm run simulate:range
npm run simulate:parallax
npm run simulate:altitude
npm run simulate:multi
```

Ledgers are written to `sim/outputs/`.

## Boundary

Simulation is not evidence that a real event happened. It tests how stated assumptions affect estimates and confidence.


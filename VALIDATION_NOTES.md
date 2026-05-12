# Validation Notes

## Dependency Decision

The initial scaffold used `ajv-cli` for schema validation. Local `npm audit --json` reported two high-severity findings through the `ajv-cli` dependency chain:

- direct package: `ajv-cli`;
- vulnerable transitive package: `fast-json-patch <3.1.1`;
- advisory category: prototype pollution.

The validator now uses the `ajv` library directly from `scripts/validate-json.js`. This removes the CLI wrapper and avoids unnecessary transitive dependencies for this scaffold.

## Scenario Validation

`schemas/simulation-scenario.schema.json` validates every JSON scenario under `sim/scenarios/`.

## Generated Ledgers

Simulation ledgers under `sim/outputs/*.ledger.json` are generated working outputs. They are ignored by `.gitignore` and should not be committed unless a human reviewer intentionally promotes a specific ledger into a synthetic example fixture.

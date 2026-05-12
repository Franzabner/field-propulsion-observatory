# field-propulsion-observatory

A public-safe engineering framework for evaluating anomalous motion claims through sensor metadata, trajectory reconstruction, simulation, and propulsion hypothesis boundaries.

This repository does not attempt to prove non-human technology. It asks a narrower engineering question:

When an object appears to move beyond conventional aerospace expectations, what data would be required to know whether the motion is real, misread, explainable, simulated under assumptions, or genuinely unresolved?

## Repo Identity

`field-propulsion-observatory` is a Franzabner public technical surface for disciplined analysis of anomalous-motion claims. It is designed for mechanical, electrical, and autonomous systems reasoning: sensor chain review, geometry discipline, trajectory reconstruction, uncertainty modeling, and careful hypothesis boundaries.

## What This Is

This is an engineering documentation and simulation scaffold for turning public observation reports into structured questions:

| Layer | Purpose |
| --- | --- |
| Observation records | Capture what was reported without elevating it into proof. |
| Sensor metadata | Identify what must be known about platform, timing, optics, radar, infrared, and custody. |
| Geometry | Keep range, angle, field of view, and platform motion explicit. |
| Trajectory reconstruction | Estimate bounded motion only when inputs support it. |
| Simulation | Test how assumptions change apparent speed, acceleration, and uncertainty. |
| Hypothesis boundary | State what is ruled in, ruled out, unresolved, or not reviewable. |

## What This Is Not

This repository is not a claim that UAP reports represent aliens, extraterrestrial technology, anti-gravity, zero-point propulsion, free energy, recovered materials, classified programs, or government coverups.

It is also not a debunking-only repository. The goal is disciplined classification: known, unknown, simulated under assumptions, missing critical metadata, or unresolved.

## Why This Exists

Modern sensor civilization can produce unresolved observations without producing public scientific closure. Public video, screenshots, clips, anecdotes, and partial metadata often circulate faster than calibrated evidence. This repo provides a public-safe way to slow the analysis down and ask what would be required before making propulsion claims.

## Grounding Principles

1. Detection is not resolution.
2. Video is not enough without metadata.
3. Apparent motion is not proven motion until range, frame, sensor, and timing are known.
4. Unresolved does not mean extraterrestrial.
5. Extraordinary propulsion hypotheses require calibrated multi-sensor evidence.
6. The repo studies the evaluation process, not secret claims.
7. Field propulsion and zero-point energy are speculative hypothesis vocabulary, not demonstrated technology.
8. Simulation does not prove an event happened; simulation tests what the evidence would imply under stated assumptions.
9. Unknown range creates unknown size, speed, acceleration, and energy.
10. No propulsion conclusion should be made from video alone.

## Core Workflow

Observation -> Sensor Metadata -> Geometry -> Trajectory -> Motion Claim -> Simulation Run -> Hypothesis Boundary -> Review Status

## Simulation Workflow

Scenario -> Assumptions -> Sensor Model -> Geometry Model -> Trajectory Estimate -> Uncertainty Sweep -> Hypothesis Boundary -> Simulation Ledger

Run the lightweight examples:

```bash
npm install
npm run simulate:range
npm run simulate:parallax
npm run simulate:altitude
npm run simulate:multi
```

The simulation engine estimates range-dependent speed and basic acceleration where inputs exist. It emits uncertainty notes and boundary language. It never outputs exotic propulsion conclusions.

## Evidence Pipeline

| Stage | Required discipline |
| --- | --- |
| Report | Separate witness statement, media artifact, and analyst interpretation. |
| Metadata | Record timing, platform state, sensor mode, frame rate, field of view, range, weather, and custody. |
| Geometry | Declare range assumptions and camera/platform motion. |
| Trajectory | Reconstruct only what the metadata supports. |
| Simulation | Sweep assumptions and record how conclusions move. |
| Review | Classify confidence and missing evidence. |

## Repository Map

| Path | Role |
| --- | --- |
| `docs/` | Public-safe technical doctrine for evidence, sensors, trajectory, simulation, and hypothesis boundaries. |
| `diagrams/` | Mermaid diagrams for pipeline, fusion, taxonomy, simulation, DGX roadmap, and uncertainty flow. |
| `schemas/` | JSON Schemas for observation events, sensor metadata, motion claims, hypothesis scores, simulation runs, trajectory estimates, uncertainty models, and synthetic sensor frames. |
| `examples/` | Fictional synthetic examples that validate against the schemas. |
| `sim/` | Lightweight Node.js simulation engine and public-safe scenarios. |
| `templates/` | Case-study, review, release-note, simulation-report, and DGX run-log templates. |
| `assets/` | Public-safe banner assets with no sensational imagery. |
| `scripts/` | Validation and simulation CLI entry points. |

## Example Use Case

A public video appears to show a small object crossing the frame rapidly. The pipeline does not begin with a propulsion claim. It asks:

- What is the frame rate?
- Was the camera panning?
- What field of view and zoom were used?
- Is the target range known or assumed?
- Is there radar, infrared, or optical correlation?
- Does the estimated speed collapse under a nearer range assumption?
- What metadata would be required for independent reconstruction?

The output may be: insufficient data, low confidence reconstruction, bounded reconstruction, multi-sensor supported, independently reconstructable, or scientifically reviewable.

## Boundary Policy

This repository makes no claim that UAP reports represent extraterrestrial technology, zero-point energy systems, recovered materials, or classified propulsion programs. It is a documentation, simulation, and reasoning framework for disciplined analysis of anomalous-motion claims.

No real classified cases, named disputed events, named pilots, agencies as case authorities, whistleblower claims, private infrastructure details, sealed IP, or sensational imagery are included.

## DGX-Scale Roadmap

Future private or controlled-lab work may use a high-compute simulation environment for trajectory Monte Carlo, synthetic sensor generation, and multi-sensor fusion experiments. This public scaffold does not claim that such work is complete and does not expose rack topology, private lab details, datasets, or sealed implementation.

Public release notes for future high-compute work must summarize only safe methods, assumptions, validation status, and non-sensitive findings.

## Hugging Face Plan

Hugging Face is planned-only for this repo. No HF repository, dataset, model, Space, report, or artifact has been created. Franzabner Hugging Face token/auth setup is required in a later dedicated session before any HF action.

Possible future HF surfaces include reviewed synthetic observation-event examples, dataset card templates, and hypothesis-score report templates. They must remain synthetic and public-safe.

## Upwork / Service Relevance

Draft-only service relevance:

- sensor metadata checklist design;
- public-safe evidence framework documentation;
- trajectory reconstruction documentation templates;
- JSON schema and validation setup;
- technical report templates;
- claim-boundary review.

This is not an offer to prove UFOs, validate anti-gravity, verify zero-point propulsion, or provide sensational/conspiracy services.

## Citations / Public Grounding

Public grounding sources by name only:

- NASA UAP Independent Study Team Final Report
- AARO Official UAP Imagery
- AARO Historical Record Report
- AARO public FAQ / public statements

These sources are named for public grounding and terminology discipline. This repo does not claim that they confirm aliens or exotic propulsion.

## Status

Public scaffold.
Release status: scaffolded.
License pending human review.
Synthetic examples only.
No real case claims.
No Hugging Face artifact released.
No Upwork listing published.
No exotic propulsion claim.


#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const Ajv = require("ajv");

const ROOT = process.cwd();
const ajv = new Ajv({ allErrors: true, strict: false });

const schemaFiles = [
  "schemas/observation-event.schema.json",
  "schemas/sensor-metadata.schema.json",
  "schemas/motion-claim.schema.json",
  "schemas/hypothesis-score.schema.json",
  "schemas/simulation-run.schema.json",
  "schemas/trajectory-estimate.schema.json",
  "schemas/uncertainty-model.schema.json",
  "schemas/synthetic-sensor-frame.schema.json",
  "schemas/simulation-scenario.schema.json"
];

const examplePairs = [
  ["schemas/observation-event.schema.json", "examples/example-observation-event.json"],
  ["schemas/sensor-metadata.schema.json", "examples/example-sensor-metadata.json"],
  ["schemas/motion-claim.schema.json", "examples/example-motion-claim.json"],
  ["schemas/hypothesis-score.schema.json", "examples/example-hypothesis-score.json"],
  ["schemas/simulation-run.schema.json", "examples/example-simulation-run.json"],
  ["schemas/trajectory-estimate.schema.json", "examples/example-trajectory-estimate.json"],
  ["schemas/uncertainty-model.schema.json", "examples/example-uncertainty-model.json"],
  ["schemas/synthetic-sensor-frame.schema.json", "examples/example-synthetic-sensor-frame.json"]
];

function walkJsonFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      return walkJsonFiles(fullPath);
    }
    return entry.isFile() && entry.name.endsWith(".json") ? [fullPath] : [];
  });
}

function parseAllJson() {
  const jsonFiles = [
    ...walkJsonFiles(path.join(ROOT, "schemas")),
    ...walkJsonFiles(path.join(ROOT, "examples")),
    ...walkJsonFiles(path.join(ROOT, "sim", "scenarios"))
  ];

  for (const file of jsonFiles) {
    JSON.parse(fs.readFileSync(file, "utf8"));
  }
  console.log(`json parse: ${jsonFiles.length} files ok`);
}

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, relativePath), "utf8"));
}

function formatErrors(errors) {
  return ajv.errorsText(errors, { separator: "\n" });
}

function compileSchemas() {
  for (const schema of schemaFiles) {
    const schemaDocument = readJson(schema);
    const valid = ajv.validateSchema(schemaDocument);
    if (!valid) {
      throw new Error(`${schema} schema is invalid:\n${formatErrors(ajv.errors)}`);
    }
    ajv.addSchema(schemaDocument, schema);
    console.log(`${schema} is valid`);
  }
  console.log(`schema compile: ${schemaFiles.length} schemas ok`);
}

function validateExamples() {
  for (const [schema, example] of examplePairs) {
    const validate = ajv.getSchema(schema);
    const data = readJson(example);
    if (!validate(data)) {
      throw new Error(`${example} invalid against ${schema}:\n${formatErrors(validate.errors)}`);
    }
    console.log(`${example} valid`);
  }
  console.log(`schema examples: ${examplePairs.length} examples ok`);
}

function validateScenarios() {
  const validate = ajv.getSchema("schemas/simulation-scenario.schema.json");
  const scenarioDir = path.join(ROOT, "sim", "scenarios");
  const scenarioFiles = fs
    .readdirSync(scenarioDir)
    .filter((fileName) => fileName.endsWith(".scenario.json"))
    .sort()
    .map((fileName) => path.join("sim", "scenarios", fileName));

  for (const scenario of scenarioFiles) {
    const data = readJson(scenario);
    if (!validate(data)) {
      throw new Error(`${scenario} invalid against simulation scenario schema:\n${formatErrors(validate.errors)}`);
    }
    console.log(`${scenario} valid`);
  }
  console.log(`scenario validation: ${scenarioFiles.length} scenarios ok`);
}

try {
  parseAllJson();
  compileSchemas();
  validateExamples();
  validateScenarios();
  console.log("validation complete");
} catch (error) {
  console.error(error.message);
  process.exit(1);
}

const R = require("rambdax");
const fs = require("fs");
const S3 = require("./aws");
const { config, capitalize, extractParametersFromUri } = require("./utils");
const acquireImage = require("./acquireImage");

const endpoints = config.endpoints;

/**
 * @function generateFunctionName
 * @param {string} endpoint
 * @param {string} social
 * @return {string}
 */

const generateFunctionName = (endpoint, social) =>
  `generate${capitalize(endpoint)}${capitalize(social)}`;

/**
 * @function generateDynamicFunction
 * @param {string} endpoint
 * @param {string} social
 * @return {Record<string, Function>}
 */

const generateDynamicFunction = (endpoint, social) => ({
  async [generateFunctionName(endpoint, social)](args) {
    const buffer = await acquireImage(
      extractParametersFromUri(endpoints[endpoint][social], args),
      config.viewports[social]
    );

    return {
      toFileSync: path => fs.writeFileSync(path, buffer),
      toFile: path =>
        new Promise((resolve, reject) =>
          fs.writeFile(path, buffer, err => (err ? reject(err) : resolve()))
        ),
      toS3: (fileName, placeholders) => S3(buffer, fileName, placeholders),
      buffer
    };
  }
});

/**
 * @function generateEndpoint
 * @param {string} endpoint
 * @return {Record<string, Function>}
 */

const generateEndpoint = endpoint =>
  R.mergeAll(R.keys(endpoints[endpoint]).map(social => generateDynamicFunction(endpoint, social)));

const generateDynamicEndpoints = R.compose(R.mergeAll, R.map(generateEndpoint), R.keys);

module.exports = {
  generateEndpoint,
  generateDynamicFunction,
  generateFunctionName,
  useGenerator: {
    ...generateDynamicEndpoints(endpoints)
  }
};

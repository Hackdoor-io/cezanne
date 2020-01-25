const R = require("rambdax");
const { config, capitalize } = require("./utils");
const acquireImage = require("./acquireImage");

const endpoints = config.endpoints;

/**
 * @function extractParametersFromUri
 * @param {string} uri
 * @param {Record<string, string>} args
 * @return {string}
 */

const extractParametersFromUri = (uri, args) => {
  const params = uri.match(/:\w+/gi) || [];

  let finalUri = uri;

  for (const param of params) {
    const sanitizedParam = param.replace(/^:/, "");
    finalUri = finalUri.replace(param, args[sanitizedParam]);
  }

  return finalUri;
};

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
  [generateFunctionName(endpoint, social)](args) {
    return acquireImage(
      extractParametersFromUri(endpoints[endpoint][social], args),
      config.viewports[social]
    );
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
  extractParametersFromUri,
  create: {
    ...generateDynamicEndpoints(endpoints)
  }
};

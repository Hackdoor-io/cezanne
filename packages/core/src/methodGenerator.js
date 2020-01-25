const R = require("rambdax");
const { config, capitalize } = require("./utils");
const acquireImage = require("./acquireImage");

const endpoints = config.endpoints;

exports.extractParametersFromUri = (uri, args) => {
  const params = uri.match(/:\w+/gi) || [];

  let finalUri = uri;

  for (const param of params) {
    const sanitizedParam = param.replace(/^:/, "");
    finalUri = finalUri.replace(param, args[sanitizedParam]);
  }

  return finalUri;
};

exports.generateFunctionName = (endpoint, social) => `generate${capitalize(endpoint)}${capitalize(social)}`;

exports.generateDynamicFunction = (endpoint, social) => ({
  [generateFunctionName(endpoint, social)](args) {
    return acquireImage(
      extractParametersFromUri(endpoints[endpoint][social], args),
      config.viewports[social]
    );
  }
});

exports.generateEndpoint = (endpoint) =>
  R.mergeAll(
    R.keys(endpoints[endpoint]).map(social => generateDynamicFunction(endpoint, String(social)))
  );

exports.generateDynamicEndpoints = R.compose(R.mergeAll, R.map(generateEndpoint), R.keys);

module.exports = {
  ...generateDynamicEndpoints(endpoints)
};

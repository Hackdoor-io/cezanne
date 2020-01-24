import * as R from "ramda";
import { config, capitalize } from "./utils"
import acquireImage from "./acquireImage"

const endpoints = config.endpoints;

export const extractParametersFromUri = (uri: string, args: Record<string, any>): string => {
  const params = uri.match(/:\w+/gi) || [];

  let finalUri = uri;

  for (const param of params) {
    const sanitizedParam = param.replace(/^:/, "");
    finalUri = finalUri.replace(param, args[sanitizedParam]);
  }

  return finalUri;
};

export const generateFunctionName = (endpoint: string, social: string): string => `generate${capitalize(endpoint)}${capitalize(social)}`

export const generateDynamicFunction = (endpoint: string, social: string): Record<string, any> => ({
  [generateFunctionName(endpoint, social)](args: Record<string, any>) {
    return acquireImage(extractParametersFromUri(endpoints[endpoint][social], args), config.viewports[social])
  }
});

const generateEndpoint = (endpoint: string) =>
  // @ts-ignore
  R.mergeAll(R.keys(endpoints[endpoint]).map((social) => generateDynamicFunction(endpoint, social)));

const generateDynamicEndpoints = R.compose(
  R.mergeAll,
  R.map(generateEndpoint),
  R.keys
);

module.exports = {
  ...generateDynamicEndpoints(endpoints)
};

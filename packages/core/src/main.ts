import * as R from "ramda";
import { config, capitalize } from "./utils"
import acquireImage from "./acquireImage"

const endpoints = config.endpoints;

const extractParametersFromUri = (uri: string, args: any) => {
  const params = uri.match(/:\w+/gi) || [];

  let finalUri = uri;

  for (const param of params) {
    const sanitizedParam = param.replace(/^:/, "");
    finalUri = finalUri.replace(param, args[sanitizedParam]);
  }

  return finalUri;
};

type generateDynamicFunction = (endpoint: string, social: string) => Record<string, any>;
const generateDynamicFunction: generateDynamicFunction = (endpoint, social) => ({
  // @ts-ignore
  [`generate${capitalize(endpoint)}${capitalize(social)}`]:
    (args: Record<string, any>) => acquireImage(extractParametersFromUri(endpoints[endpoint][social], args), config.viewports[social])
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
  buildUri: generateDynamicEndpoints(endpoints)
};

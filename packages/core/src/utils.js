const findUp = require("find-up");
const chalk = require("chalk");

const configPath = findUp.sync("cezanne.config.json");

if (typeof configPath === "undefined") {
  console.error(`Error: Unable to find cezanne.config.json file in your project.`);
  process.exit(1);
}

/**
 * @constant config
 * @returns {Record<string, any>}
 */

const config = require(configPath);

/**
 * @constant debug
 * @type {boolean}
 */

const debug = !!config.debug;

/**
 * @function log
 * @param {string} text
 * @return {{warn: void, error: void, info: void}}
 */

const log = {
  error: text => debug && console.log("[cezanne] ", chalk.red(text)),
  info: text => debug && console.log("[cezanne] ", chalk.cyan(text)),
  warn: text => debug && console.log("[cezanne] ", chalk.yellow(text))
};

/**
 * @function capitalize
 * @param {string} text
 * @return {string}
 */

const capitalize = text => {
  return typeof text === "string" ? text.charAt(0).toUpperCase() + text.slice(1) : "";
};

/**
 * @function extractParametersFromUri
 * @param {string} uri
 * @param {Record<string, string>} args
 * @return {string}
 */

const extractParametersFromUri = (uri, args) => {
  log.info(`Got the following url: ${uri}`);
  const params = uri.match(/:\w+/gi) || [];
  log.info(`Extracted parameters: ${params.join(", ")}`);

  let finalUri = uri;

  for (const param of params) {
    const sanitizedParam = param.replace(/^:/, "");
    finalUri = finalUri.replace(param, args[sanitizedParam]);
  }

  log.info(`Final url: ${finalUri}`);
  return finalUri;
};

module.exports = {
  config,
  debug,
  log,
  extractParametersFromUri,
  capitalize
};

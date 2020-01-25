const findUp = require("find-up");
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
 * @function capitalize
 * @param {string} text
 * @return {string}
 */

const capitalize = text => {
  return typeof text === "string" ? text.charAt(0).toUpperCase() + text.slice(1) : "";
};

module.exports = {
  config,
  capitalize
};

const findUp = require("find-up");

const configPath = findUp.sync("cezanne.config.json");

if (typeof configPath === "undefined") {
  console.error(`Error: Unable to find cezanne.config.json file in your project.`);
  process.exit(1);
}

const config = require(configPath);

const capitalize = text => {
  return typeof text === "string" ? text.charAt(0).toUpperCase() + text.slice(1) : "";
};

module.exports = {
  config,
  capitalize
};

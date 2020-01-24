const findUp = require("find-up");

const configPath = findUp("cezanne.config.json");

export const config: Record<string, any> = require(configPath);

export const capitalize = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

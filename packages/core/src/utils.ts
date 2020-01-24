import rootDir from "pkg-dir";

// @ts-ignore
export const config: Record<string, any> = require(`${rootDir.sync(process.cwd())}/cezanne.config.json`);

export const capitalize = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1)
};

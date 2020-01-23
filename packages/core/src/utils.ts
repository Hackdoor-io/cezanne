import * as R from "ramda";
import rootDir from "pkg-dir";

// @ts-ignore
export const config = require(`${rootDir.sync(process.cwd())}/cezanne.config.json`);

export const capitalize = R.compose(
  R.join(""),
  R.juxt([R.compose(R.toUpper, R.head), R.tail])
);

export type genericObject = Record<string, any>;

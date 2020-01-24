import typescript from "rollup-plugin-typescript2";
import bundleSize from "rollup-plugin-bundle-size";
import { terser } from "rollup-plugin-terser";
import resolve from "@rollup/plugin-node-resolve";

export default {
  input: "./src/main.ts",
  output: [
    {
      file: "lib/main.js",
      format: "cjs",
      name: "lib/main.js"
    }
  ],

  watch: {
    exclude: ["node_modules/**"]
  },

  plugins: [typescript(), terser(), bundleSize(), resolve()]
};

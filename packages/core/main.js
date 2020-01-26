const { create } = require("./src/methodGenerator");
const toS3 = require("./src/aws");
const toFile = require("./src/writeFile");

module.exports = {
  create,
  toFile,
  toS3
};

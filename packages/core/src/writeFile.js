const fs = require("fs");

/**
 * @function saveFile
 * @param {Buffer|string} file
 * @param {string} name
 * @param {string} path
 * @return {Promise<string>}
 */

const saveFile = ({ file, name, path }) =>
  new Promise((resolve, reject) =>
    fs.writeFile(`${path}/${name}`, file, err => (err ? reject(err) : resolve(`${path}/${name}`)))
  );

module.exports = saveFile;

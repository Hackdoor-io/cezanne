const AWS = require("aws-sdk");
const { config, extractParametersFromUri, log } = require("./utils");

const S3 = new AWS.S3({
  accessKeyId: config.aws.access_key,
  secretAccessKey: config.aws.access_secret
});

/**
 * @function uploadFile
 * @param {Buffer|string} file
 * @param {string} key
 * @return {Promise<ManagedUpload.SendData>}
 */

const uploadFile = ({ file, key }) =>
  S3.upload({ Bucket: config.aws.bucket_name, Key: key, Body: file }).promise();

/**
 * @function toS3
 * @param {Buffer|string} file
 * @param {string} name
 * @param {Record<string, any>[]} placeholders
 * @return {Promise<ManagedUpload.SendData>}
 */

const toS3 = (file, name, placeholders) => {
  const path = extractParametersFromUri(config.aws.path, placeholders);
  log.info(`Uploading file "${name}" to ${path}`);
  return uploadFile({ file, key: path + `/${name}` });
};

module.exports = toS3;

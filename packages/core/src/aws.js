const AWS = require("aws-sdk");
const { config } = require("./utils");

const S3 = new AWS.S3({
  accessKeyId: config.aws.access_key,
  secretAccessKey: config.aws.access_secret
});


export const uploadFile = ({ file, key }) =>
  S3.upload({ Bucket: config.aws.bucket_name, Key: key, Body: file }).promise();

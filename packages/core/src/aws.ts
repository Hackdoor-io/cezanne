import * as AWS from "aws-sdk";
import { config } from "./utils";

const S3 = new AWS.S3({
  accessKeyId: config.aws.access_key,
  secretAccessKey: config.aws.access_secret
});

type fileUploadParams = {
  file: string,
  key: string
};

type uploadFile = (params: fileUploadParams) => Promise<any>;
export const uploadFile: uploadFile = ({ file, key } ) =>
  S3
    .upload({ Bucket: config.aws.bucket_name, Key: key, Body: file })
    .promise();

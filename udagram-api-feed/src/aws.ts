import AWS = require('aws-sdk');
import {config} from './config/config';


// Configure AWS
// const credentials = new AWS.SharedIniFileCredentials({profile: config.aws_profile});
// AWS.config.credentials = credentials;
AWS.config.credentials = {
  accessKeyId: config.aws_access_key_id,
  secretAccessKey: config.aws_secret_access_key,
};
console.log("s3 bucket region: ", config.aws_region);
export const s3 = new AWS.S3({
  signatureVersion: 'v4',
  params: {Bucket: config.aws_media_bucket},
  logger: console,
  region: config.aws_region
});

// Generates an AWS signed URL for retrieving objects
export function getGetSignedUrl( key: string ): string {
  const signedUrlExpireSeconds = 60 * 5;
  console.log("get Object from the bucket:", config.aws_media_bucket);
  console.log("get Object key:", key);
  return s3.getSignedUrl('getObject', {
    Bucket: config.aws_media_bucket,
    Key: key,
    Expires: signedUrlExpireSeconds,
  });
}

// Generates an AWS signed URL for uploading objects
export function getPutSignedUrl( key: string ): string {
  const signedUrlExpireSeconds = 60 * 5;
  console.log("putObject to the bucket:", config.aws_media_bucket);
  console.log("putObject key:", key);
  var url = s3.getSignedUrl('putObject', {
    Bucket: config.aws_media_bucket,
    Key: key,
    Expires: signedUrlExpireSeconds,
  });
  return url;
}

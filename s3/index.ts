import S3 from "aws-sdk/clients/s3";
import { config } from "dotenv";
import fs from "fs";
import { S3Client, PutObjectCommand, PutObjectRequest } from "@aws-sdk/client-s3";

config();

const bucketName = process.env.S3_BUCKET_NAME;
const region = process.env.S3_REGION;
const accessKeyId = process.env.S3_ACCESS_KEY_ID;
const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY;

// const s3Client = new S3Client( { credentials: {
//     accessKeyId: accessKeyId as string,
//     secretAccessKey: secretAccessKey as string
// }, region} );

const s3Client = new S3({
    region,
    accessKeyId,
    secretAccessKey
  })


export  function uploadFile( file: Express.Multer.File ){
    const fileStream = fs.createReadStream( file.path );

    const params = {
        Bucket: bucketName as string,
        Body: fileStream,
        Key: file.filename
      }

    // const results = await s3Client.send(new PutObjectCommand(params));

    return s3Client.upload(params).promise();

}

// downloads a file from s3

export async function getFileStream( Key: string ){
  const params = {
    Key,
    Bucket: bucketName as string
  }

  return s3Client.getObject( params ).createReadStream();
}



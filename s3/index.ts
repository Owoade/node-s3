import S3 from "aws-sdk/clients/s3";
import { config } from "dotenv";
import fs from "fs";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

config();

const bucketName = process.env.S3_BUCKET_NAME;
const region = process.env.S3_REGION;
const accessKeyId = process.env.S3_ACCESS_KEY_ID;
const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY;

const s3Client = new S3Client( { credentials: {
    accessKeyId: accessKeyId as string,
    secretAccessKey: secretAccessKey as string
}, region} );


export async function uploadFile( file: Express.Multer.File ){
    const fileStream = fs.createReadStream( file.path );

    const params = {
        Bucket: bucketName, // The name of the bucket. For example, 'sample_bucket_101'.
        Key: file.filename, // The name of the object. For example, 'sample_upload.txt'.
        Body: fileStream, // The content of the object. For example, 'Hello world!".
    };

    const results = await s3Client.send(new PutObjectCommand(params));

    return results;

}


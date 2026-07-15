import dotenv from "dotenv";
dotenv.config();

import { ListBucketsCommand } from "@aws-sdk/client-s3";
import s3 from "../configs/s3.js";

console.log("Access Key:", process.env.AWS_ACCESS_KEY_ID);
console.log("Secret Exists:", !!process.env.AWS_SECRET_ACCESS_KEY);
console.log("Region:", process.env.AWS_REGION);

try {
    const result = await s3.send(new ListBucketsCommand({}));
    console.log(result.Buckets);
} catch (err) {
    console.error(err);
}
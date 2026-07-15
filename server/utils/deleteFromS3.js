import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import s3 from "../configs/s3.js";

export const deleteFromS3 = async (key) => {
    if (!key) return;

    // Ignore external URLs
    if (
        key.startsWith("http://") ||
        key.startsWith("https://")
    ) {
        return;
    }

    await s3.send(
        new DeleteObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: key,
        })
    );
};
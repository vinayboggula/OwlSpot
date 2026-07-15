import s3 from "../configs/s3.js";

import { GetObjectCommand } from "@aws-sdk/client-s3";

import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const generateSignedUrl = async (key) => {
    if (!key) return null;

    // Already an external URL (Unsplash, ImageKit, Picsum)
    if (key.startsWith("http://") || key.startsWith("https://")) {
        return key;
    }

    const command = new GetObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
    });

    return await getSignedUrl(s3, command, {
        expiresIn: 3600,
    });
};
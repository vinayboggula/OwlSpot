import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import s3 from "../configs/s3.js";

export const generateSignedUrl = async (key) => {
    if (!key) return null;

    // Already a complete URL (ImageKit, Unsplash, Picsum, etc.)
    if (
        key.startsWith("http://") ||
        key.startsWith("https://")
    ) {
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

export const attachSignedUrl = async (document, field = "image") => {
    if (!document) return document;

    if (document[field]) {
        document[field] = await generateSignedUrl(document[field]);
    }

    return document;
};

export const attachSignedUrls = async (documents, field = "image") => {
    return await Promise.all(
        documents.map(async (doc) => {
            if (doc[field]) {
                doc[field] = await generateSignedUrl(doc[field]);
            }
            return doc;
        })
    );
};
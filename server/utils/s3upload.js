import { PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";
import s3 from "../configs/s3.js";

export const uploadToS3 = async (file, folder = "uploads") => {
    const fileBuffer = await fs.promises.readFile(file.path);

    const fileName = `${folder}/${Date.now()}-${file.originalname}`;

    await s3.send(
        new PutObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: fileName,
            Body: fileBuffer,
            ContentType: file.mimetype,
        })
    );

    // Delete temporary file
    fs.unlink(file.path, () => { });

    return fileName;
};
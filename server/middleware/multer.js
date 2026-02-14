import multer from "multer";

const upload = multer({
    storage: multer.diskStorage({}),
    limits: { fileSize: 200 * 1024 * 1024 }
});

export default upload;

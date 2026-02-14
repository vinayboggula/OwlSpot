import multer from "multer";

const aiUpload = multer({
    storage: multer.diskStorage({}),
    limits: {
        fileSize: 10 * 1024 * 1024 //10mb for image 
    },
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith("image/")) {
            cb(new Error("Only image files are allowed"));
        }
        cb(null, true);
    }
});

export default aiUpload;

import express from 'express';
import {
    addBlog,
    addComments,
    generateContent,
    getAllBlogs,
    getBlogById,
    getBlogComments
} from '../controllers/blogContollers.js';

import auth from '../middleware/auth.js';
import upload from '../middleware/multer.js';

const blogRouter = express.Router();

// Public
blogRouter.get("/all", getAllBlogs);
blogRouter.get("/:blogId", getBlogById);
blogRouter.get("/comments/:blogId", getBlogComments);
blogRouter.post("/add-blogComment", addComments);

// Authenticated user (owner)
blogRouter.post("/add", auth, upload.single('image'), addBlog);
// blogRouter.post("/delete", auth, deleteBlogById);
// blogRouter.post("/toggle-publish", auth, togglePublish);
blogRouter.post("/generate", auth, generateContent);

export default blogRouter;

import mongoose from "mongoose";
import main from "../configs/grok.js";
import Blog from '../models/Blog.js';
import Comment from '../models/Comment.js';
import { attachSignedUrl, attachSignedUrls } from "../utils/s3Helpers.js";
import { uploadToS3 } from "../utils/s3Upload.js";

export const addBlog = async (req, res) => {
    try {
        const { title, subTitle, description, category, isPublished } =
            JSON.parse(req.body.blog);

        const imageFile = req.file;

        if (!title || !subTitle || !description || !category || !imageFile) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields"
            });
        }

        // taken owner id from jwt
        const creator = req.user.id;

        const image = await uploadToS3(imageFile, "blogs");

        await Blog.create({
            creator,
            title,
            subTitle,
            description,
            category,
            image,
            isPublished
        });

        return res.json({
            success: true,
            message: "Blog added successfully",
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

//public blogs
export const getAllBlogs = async (req, res) => {
    try {
        const blogs = (
            await Blog.find({ isPublished: true })
                .sort({ createdAt: -1 })
                .populate("creator", "name email")
        ).map(blog => blog.toObject());

        await attachSignedUrls(blogs);

        return res.json({
            success: true,
            blogs,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//get single blog
export const getBlogById = async (req, res) => {
    try {
        const { blogId } = req.params

        if (!mongoose.Types.ObjectId.isValid(blogId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Blog ID"
            });
        }
        const blog = await Blog.findById(blogId)
            .populate("creator", "name email");

        if (!blog) {
            return res.json({ success: false, message: "Blog not found" })
        }

        await attachSignedUrl(blog);
        res.json({ success: true, blog })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const addComments = async (req, res) => {
    try {
        const { blog, name, content } = req.body
        const blogExists = await Blog.findById(blog);
        if (!blogExists || !blogExists.isPublished) {
            return res.status(400).json({ message: "Invalid blog" });
        }
        await Comment.create({ blog, name, content })
        return res.json({ success: true, message: 'comment added' })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const getBlogComments = async (req, res) => {
    try {
        const { blogId } = req.params
        const comments = await Comment.find({ blog: blogId }).sort({ createdAt: -1 })
        return res.json({ success: true, comments })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const generateContent = async (req, res) => {
    try {
        const { prompt } = req.body

        const content = await main(prompt)
        return res.json({ success: true, content })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

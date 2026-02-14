import fs from "fs";
import main from "../configs/grok.js";
import imagekit from "../configs/imageKit.js";
import Blog from '../models/Blog.js';
import Comment from '../models/Comment.js';

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

        const fileBuffer = await fs.promises.readFile(imageFile.path);

        //  ImageKit2 v4 upload
        const response = await imagekit.files.upload({
            file: fileBuffer.toString('base64'),
            fileName: imageFile.originalname,
            folder: "/blogs"
        });

        // ImageKit2 v4 URL (manual)
        const image = `${process.env.IMAGEKIT_URL_ENDPOINT}${response.filePath}`;

        // cleanup temp file
        fs.unlink(imageFile.path, () => { });

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
        const blogs = await Blog.find({ isPublished: true })
            .sort({ createdAt: -1 }).populate("creator", "name email");
        res.json({ success: true, blogs })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

//get single blog
export const getBlogById = async (req, res) => {
    try {
        const { blogId } = req.params
        const blog = await Blog.findById(blogId)
            .populate("creator", "name email");
        if (!blog) {
            return res.json({ success: false, message: "Blog not found" })
        }
        res.json({ success: true, blog })
    } catch (error) {
        res.json({ success: false, message: error.message })
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
        res.json({ success: true, message: 'comment added' })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const getBlogComments = async (req, res) => {
    try {
        const { blogId } = req.params
        const comments = await Comment.find({ blog: blogId }).sort({ createdAt: -1 })
        res.json({ success: true, comments })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const generateContent = async (req, res) => {
    try {
        const { prompt } = req.body

        const content = await main(prompt)
        res.json({ success: true, content })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

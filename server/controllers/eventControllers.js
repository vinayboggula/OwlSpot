import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import multer from 'multer';
import imagekit2 from "../configs/imagekit2.js";
import interpretThumbnailPrompt from "../configs/prompt.js";
import generateEventThumbnail from "../configs/thumbnail.js";
import EventComment from '../models/EventComments.js';
import Events from "../models/Events.js";

const upload = multer({ dest: 'uploads/' });

export const addEvent = async (req, res) => {
    try {
        const { title, description, category, date, isPublished } = JSON.parse(req.body.event);

        const imageFile = req.files?.image?.[0];

        const videoFiles = req.files?.videos || [];

        if (!title || !description || !category || !date || !imageFile || !videoFiles) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields"
            });
        }
        const creator = req.user.id;
        const imageBuffer = await fs.promises.readFile(imageFile.path);

        // Image upload
        const imageResponse = await imagekit2.files.upload({
            file: imageBuffer.toString('base64'),
            fileName: imageFile.originalname,
            folder: "/events/images"
        });

        const image = `${process.env.IMAGEKIT_URL_ENDPOINT2}${imageResponse.filePath}`;
        fs.unlink(imageFile.path, () => { });

        // video upload
        const videoUrls = [];

        for (const file of videoFiles) {
            const stream = fs.createReadStream(file.path);

            const response = await imagekit2.files.upload({
                file: stream,
                fileName: file.originalname,
                folder: "/events/videos"
            });

            videoUrls.push(
                `${process.env.IMAGEKIT_URL_ENDPOINT2}${response.filePath}`
            );

            //clean temp file
            fs.unlink(file.path, () => { });
        }

        await Events.create({
            creator,
            title,
            description,
            category,
            date,
            imageUrl: image,
            videoUrls,
            isPublished
        });

        return res.json({
            success: true,
            message: "Event added successfully",
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getAllEvents = async (req, res) => {
    try {
        const events = await Events
            .find({ isPublished: true })
            .sort({ createdAt: -1 })
            .populate("creator", "name email");

        res.status(200).json({
            success: true,
            count: events.length,
            events
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch events"
        });
    }
};

export const getEventById = async (req, res) => {
    try {
        const { eventId } = req.params;
        const event = await Events.findById(eventId)
            .populate("creator", "name email");

        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found"
            });
        }
        res.status(200).json({
            success: true,
            event
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch event"
        });
    }
};


export const generateThumbnail = async (req, res) => {
    try {
        const { text, prompt } = req.body;

        if (!text || !prompt || !req.file) {
            return res.status(400).json({
                success: false,
                message: "image, text and prompt are required",
            });
        }

        // Upload image to Cloudinary
        const uploadResult = await cloudinary.uploader.upload(req.file.path, {
            folder: "event-thumbnails",
            resource_type: "image",
        });

        // clean file 
        fs.unlinkSync(req.file.path);

        // prompt to json
        const rawJson = await interpretThumbnailPrompt(prompt);
        const options = JSON.parse(rawJson);

        // thumbnail
        const thumbnailUrl = await generateEventThumbnail(
            uploadResult.public_id,
            text,
            options
        );

        res.json({
            success: true,
            thumbnailUrl,
            appliedOptions: options,
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

export const addComments = async (req, res) => {
    try {
        const { event, name, content } = req.body
        const eventExists = await Events.findById(event);
        if (!eventExists || !eventExists.isPublished) {
            return res.status(400).json({ message: "Invalid event" });
        }
        await EventComment.create({ event, name, content })
        res.json({ success: true, message: 'comment added' })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const getEventComments = async (req, res) => {
    try {
        const { eventId } = req.params
        const comments = await EventComment.find({ event: eventId }).sort({ createdAt: -1 })
        res.json({ success: true, comments })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}


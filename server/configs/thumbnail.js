import { v2 as cloudinary } from 'cloudinary';
import 'dotenv/config';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const generateEventThumbnail = async (imagePublicId, title, options = {}) => {
    const {
        fontFamily = 'Bangers',
        fontSize = 120,
        textColor = '#FFFFFF',
        outlineWidth = 14,
        shadow = true,
        position = 'south',

        // YouTube effects
        backgroundDarken = true,
        blurBackground = false,

        width = 1280,
        height = 720,
    } = options;

    if (!title) {
        throw new Error('Text is required');
    }

    const safeText = title.replace(/,/g, '%2C');

    const transformations = [
        {
            width: 1280,
            height: 720,
            crop: "scale",
        },
        {
            overlay: {
                font_family: fontFamily,
                font_size: fontSize,
                font_weight: "bold",
                text: safeText,
            },
            color: textColor,
            gravity: position,
            y: 50,

            ...(outlineWidth > 0 && {
                stroke: `solid_${outlineWidth}_000000`,
            }),

            ...(shadow && {
                effect: "shadow:40",
            }),

            flags: "layer_apply",
        },
        { quality: "auto" },
        { fetch_format: "auto" },
    ];



    return cloudinary.url(imagePublicId, {
        transformation: transformations,
        secure: true,
    });
};

export default generateEventThumbnail;

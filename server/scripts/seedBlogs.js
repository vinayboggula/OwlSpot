import axios from "axios";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Blog from "../models/Blog.js";
dotenv.config()


console.log(process.env.MONGODB_URI)

const categories = [
    "introspection",
    "insights",
    "evolution",
    "experiences"
];

// const creators = [
//     "@vinay",
//     "@alex",
//     "@sarah",
//     "@michael",
//     "@ananya"
// ];

const getRandomItem = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];
};

const seedBlogs = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB Connected");

        // Fetch dummy posts
        const response = await axios.get(
            "https://dev.to/api/articles?per_page=20"
        );

        const posts = response.data;


        // Transform posts into OwlSpot blogs
        const blogs = posts.map((post) => ({
            title: post.title,
            subTitle: post.description || post.title,
            description: post.description || "No description available",
            category: getRandomItem(categories),
            image: post.cover_image || `https://picsum.photos/seed/${post.id}/800/600`,
            isPublished: true
        }));

        await Blog.insertMany(blogs);

        console.log("Blogs seeded successfully");
        process.exit();


    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedBlogs();

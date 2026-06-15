import axios from "axios";
import dotenv from "dotenv";
import mongoose from "mongoose";

import Events from "../models/Events.js";

dotenv.config();

const categories = [
    "introspection",
    "insights",
    "evolution",
    "experiences"
];

const titles = [
    "Late Night Coding Session",
    "First Deployment Day",
    "College Farewell",
    "Hackathon Experience",
    "Building OwlSpot",
    "Team Presentation Day",
    "100 Days of Coding",
    "Learning React Journey"
];

const descriptions = [
    "A memorable moment captured during the journey of learning and growth.",
    "An experience that taught valuable lessons about consistency and creativity.",
    "A milestone that became an important part of personal development.",
    "Documenting moments that deserve to be remembered beyond temporary social media posts."
];

const getRandomItem = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];
};

const seedEvents = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        console.log("MongoDB Connected");

        const response = await axios.get(
            "https://api.unsplash.com/photos/random",
            {
                params: {
                    count: 10,
                    query: "students coding memories"
                },
                headers: {
                    Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`
                }
            }
        );

        const events = response.data.map((item) => ({
            title: getRandomItem(titles),
            description: getRandomItem(descriptions),
            category: getRandomItem(categories),
            date: new Date(),
            imageUrl: item.urls.regular,
            videoUrls: [
                "https://www.w3schools.com/html/mov_bbb.mp4"
            ],
            tags: ["memories", "growth", "coding"],
            isPublished: true
        }));

        await Events.insertMany(events);

        console.log("Events seeded successfully");

        process.exit();

    } catch (error) {
        console.log(error);
        process.exit(1);
    }

};

seedEvents();

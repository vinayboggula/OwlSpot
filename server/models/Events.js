import mongoose from "mongoose"

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    tags: {
        type: [String],
        default: []
    },
    category: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    imageUrl: { type: String, required: true },
    videoUrls: { type: [String], required: true },
    isPublished: { type: Boolean, default: false }
},
    { timestamps: true })

const Events = mongoose.model('Events', eventSchema)

export default Events
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
    },

    googleId: String,
    avatar: String,

}, { timestamps: true });

export default mongoose.model("User", userSchema);

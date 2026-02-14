import mongoose from 'mongoose';

const EventCommentSchema = new mongoose.Schema({
    event: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Events',
        required: true,
    }, name: {
        type: String, required: true
    },
    content: {
        type: String, required: true
    },
    isApproved: {
        type: Boolean, default: true
    }
}, { timestamps: true });

const EventComment = mongoose.model('EventComment', EventCommentSchema)

export default EventComment;
import express from 'express';
import {
    addComments,
    addEvent,
    generateThumbnail,
    getAllEvents,
    getEventById,
    getEventComments
} from '../controllers/eventControllers.js';

import aiUpload from "../middleware/aimulter.js";
import auth from '../middleware/auth.js';
import upload from '../middleware/multer.js';

const eventRouter = express.Router();

// Public
eventRouter.get('/all', getAllEvents);
eventRouter.get("/:eventId", getEventById);
eventRouter.post("/add-eventComment", addComments)
eventRouter.get("/event-comments/:eventId", getEventComments)

// Logged-in user (owner)
eventRouter.post(
    '/add',
    auth,
    upload.fields([
        { name: 'image', maxCount: 1 },
        { name: 'videos', maxCount: 5 }
    ]),
    addEvent
);
// eventRouter.get('/events', auth, getMyEvents);
// eventRouter.post("/delete", auth, deleteEventById);
// eventRouter.post("/toggle-publish", auth, toggleEventPublish);
// eventRouter.get("/event-comments", auth, getEventComments)


// AI
eventRouter.post(
    "/generate-thumbnail",
    aiUpload.single("image"),
    generateThumbnail
);

export default eventRouter;

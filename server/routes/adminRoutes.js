// adminRoutes.js
import express from "express";
import auth from "../middleware/auth.js";

import {
    deleteBlogById,
    deleteCommentById,
    deleteEventById,
    deleteEventCommentById,
    getBlogComments,
    getDashboard,
    getEventComments,
    getEventDashboard,
    getMyBlogs,
    getMyEvents, toggleBlog, toggleEvent,
    updateMyBlog,
    updateMyEvent
} from "../controllers/adminController.js";

const adminRouter = express.Router();

// // login
// adminRouter.post("/login", adminLogin);

// 👤 Logged-in user (ownership-based)
adminRouter.get("/blogs", auth, getMyBlogs);
adminRouter.put("/blog/update-blog/:id", auth, updateMyBlog)
adminRouter.delete("/delete-blog", auth, deleteBlogById);
adminRouter.get("/blogComments", auth, getBlogComments);
adminRouter.get("/blog-dashboard", auth, getDashboard);
adminRouter.delete("/delete-blogcomment", auth, deleteCommentById);
adminRouter.post("/toggle-blog", auth, toggleBlog);

// 👤 Logged-in user (ownership-based)
adminRouter.get("/events", auth, getMyEvents);
adminRouter.put("event/event-update", auth, updateMyEvent)
adminRouter.delete("/delete-event", auth, deleteEventById);
adminRouter.get("/eventComments", auth, getEventComments);
adminRouter.get("/event-dashboard", auth, getEventDashboard);
adminRouter.delete("/delete-eventcomment", auth, deleteEventCommentById);
adminRouter.post("/toggle-event", auth, toggleEvent);

export default adminRouter;

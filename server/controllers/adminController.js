import Blog from "../models/Blog.js"
import Comment from "../models/Comment.js"
import EventComment from "../models/EventComments.js"
import Events from "../models/Events.js"

// export const adminLogin = async (req, res) => {
//     try {
//         const { email, password } = req.body

//         if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
//             return res.status(401).json({ success: false, message: "Invalid Credentials" })
//         }
//         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" })

//         //send as httponly cookies
//         res.cookie("token", token, {
//             httpOnly: true,
//             secure: false,
//             sameSite: "lax"
//         })

//         res.json({ success: true, message: "Admin loggin in " })
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message })
//     }
// }


//get my blogs based on user.id
export const updateMyBlog = async (req, res) => {
    try {
        const { id } = req.params
        const blog = await Blog.findByIdAndUpdate(id, req.body, { new: true })
        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" })
        }
        res.status(200).json({ success: true, message: "Blog updated!" })
    }
    catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
}

export const getMyBlogs = async (req, res) => {
    const blogs = await Blog.find({ creator: req.user.id })
        .sort({ createdAt: -1 });

    res.json({ success: true, blogs });
};

//delete a blog
export const deleteBlogById = async (req, res) => {
    const blog = await Blog.findById(req.body.id);

    if (!blog) return res.status(404).json({ message: "Blog not found" });

    if (blog.creator.toString() !== req.user.id) {
        return res.status(403).json({ message: "Not authorized" });
    }

    await blog.deleteOne();
    await Comment.deleteMany({ blog: blog._id });

    res.json({ success: true });
};

//get comments on blogs
export const getBlogComments = async (req, res) => {
    const myBlogs = await Blog.find({ creator: req.user.id }).select("_id");

    const comments = await Comment.find({
        blog: { $in: myBlogs },
    }).populate("blog");

    res.json({ success: true, comments });
};

//user-specific dashboard
export const getDashboard = async (req, res) => {
    const myBlogs = await Blog.find({ creator: req.user.id }).select("_id");

    const dashboardBlogData = {
        blogs: myBlogs.length,
        drafts: await Blog.countDocuments({
            creator: req.user.id,
            isPublished: false,
        }),
        comments: await Comment.countDocuments({
            blog: { $in: myBlogs },
            isApproved: true,
        }),
        recentBlogs: await Blog.find({ creator: req.user.id })
            .sort({ createdAt: -1 })
            .limit(5),
    };

    res.json({ success: true, dashboardBlogData });
};

//delete comment 
export const deleteCommentById = async (req, res) => {
    const comment = await Comment.findById(req.body.id).populate("blog");

    if (!comment) return res.status(404).json({ message: "Not found" });

    if (comment.blog.creator.toString() !== req.user.id) {
        return res.status(403).json({ message: "Not authorized" });
    }

    await comment.deleteOne();
    res.json({ success: true, message: "Comment deleted" });
};

//toggle publish or unpublish blog
export const toggleBlog = async (req, res) => {
    try {
        const { id } = req.body;

        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        if (blog.creator.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized" });
        }

        blog.isPublished = !blog.isPublished;
        await blog.save();

        res.json({ success: true, message: "Blog status updated" });
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}


// events
//update unpublished Event
export const updateMyEvent = async (req, res) => {
    try {
        const { id } = req.params
        const event = await Event.findByIdAndUpdate(id, req.body, { new: true })
        if (!event) {
            return res.status(404).json({ success: false, message: "Blog not found" })
        }
        res.status(200).json({ success: true, message: "Event updated!" })
    }
    catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
}

//get my events based on user.id
export const getMyEvents = async (req, res) => {
    const events = await Events.find({ creator: req.user.id })
        .sort({ createdAt: -1 })
        .populate("creator", "name email");

    res.json({ success: true, events });
};

//delete a event
export const deleteEventById = async (req, res) => {
    const event = await Events.findById(req.body.id);

    if (!event) return res.status(404).json({ message: "event not found" });

    if (event.creator.toString() !== req.user.id) {
        return res.status(403).json({ message: "Not authorized" });
    }

    await event.deleteOne();
    await Comment.deleteMany({ event: event._id });

    res.json({ success: true });
};

//get comments on events
export const getEventComments = async (req, res) => {
    const myEvents = await Events.find({ creator: req.user.id }).select("_id");

    const comments = await EventComment.find({
        event: { $in: myEvents },
    }).populate("event");

    res.json({ success: true, comments });
};


//user-specific dashboard
export const getEventDashboard = async (req, res) => {
    const myEvents = await Events.find({ creator: req.user.id }).select("_id");

    const dashboardEventData = {
        events: myEvents.length,
        drafts: await Events.countDocuments({
            creator: req.user.id,
            isPublished: false,
        }),
        comments: await EventComment.countDocuments({
            event: { $in: myEvents },
            isApproved: true,
        }),
        recentEvents: await Events.find({ creator: req.user.id })
            .sort({ createdAt: -1 })
            .limit(5),
    };

    res.json({ success: true, dashboardEventData });
};

//delete comment 
export const deleteEventCommentById = async (req, res) => {
    const comment = await EventComment.findById(req.body.id).populate("event");

    if (!comment) return res.status(404).json({ message: "Not found" });

    if (comment.event.creator.toString() !== req.user.id) {
        return res.status(403).json({ message: "Not authorized" });
    }

    await comment.deleteOne();
    res.json({ success: true, message: "Comment deleted" });
};

//toggle publish or unpublish events
export const toggleEvent = async (req, res) => {
    try {
        const { id } = req.body;

        const event = await Events.findById(id);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        if (event.creator.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized" });
        }

        event.isPublished = !event.isPublished;
        await event.save();

        res.json({ success: true, message: "Event status updated" });
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}





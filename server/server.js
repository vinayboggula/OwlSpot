import cookieParser from "cookie-parser";
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import connectDB from './configs/db.js';
import adminRouter from "./routes/adminRoutes.js";
import authRouter from "./routes/authRoutes.js";
import blogRouter from './routes/blogRoutes.js';
import eventRouter from './routes/eventRoutes.js';

dotenv.config();


const app = express();
await connectDB();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use('/api/blog', blogRouter);
app.use('/api/event', eventRouter);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

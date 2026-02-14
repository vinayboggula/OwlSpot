import express from "express";
import { getMe, googleLogin, login, signup } from "../controllers/authController.js";
import auth from "../middleware/auth.js";

const authRouter = express.Router();

authRouter.post("/google", googleLogin);
authRouter.get("/me", auth, getMe);
authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/logout", (req, res) => {
    res.clearCookie("token");
    res.json({ success: true });
});

export default authRouter;

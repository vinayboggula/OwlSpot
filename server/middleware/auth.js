import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Login required" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = { id: decoded.id } //{id,role}
        next()
    } catch (error) {
        res.status(401).json({ success: false, message: "invalid token" })
    }
}

export default auth
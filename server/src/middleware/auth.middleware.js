import jwt from "jsonwebtoken";
import User from "../models/user.model.js"

export const protectedRoute = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized - No token provided" });
        }

        const decode = jwt.decode(token, process.env.JWT_SECRET);

        if (!decode) {
            return res.status(401).json({ message: "Unauthorized - Invalid token provided" });
        }

        const user = await User.findById(decode?.userId).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        req.user = user;
        next();

    } catch (error) {
        return res.status(401).json({ message: "Unauthorized - Invalid token provided" });
    }
}
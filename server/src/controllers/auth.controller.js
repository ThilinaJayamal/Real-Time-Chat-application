import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import { generateToken } from "../lib/utils.js"
import cloudinary from "../lib/cloudinary.js"

export const signup = async (req, res) => {
    const { email, password, fullName, profilePic } = req.body;
    try {
        if (!email || !password || !fullName) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (password?.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters." });
        }

        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            email,
            fullName,
            password: hashPassword,
            profilePic
        });

        if (newUser) {
            generateToken(newUser._id, res);
        }

        return res.status(201).json({
            id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            profilePic: newUser?.profilePic
        })

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        generateToken(user._id, res);

        return res.status(201).json({
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user?.profilePic
        });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }

}

export const logout = (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({ message: "Logout successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const updateProfile = async (req, res) => {
    const { profilePic } = req.body;
    try {
        if (!profilePic) {
            return res.status(400).json({ message: "profilePic is required" })
        }
        const userId = req.user._id;
        const uploadResponse = await cloudinary.uploader.upload(profilePic);

        const user = await User.findByIdAndUpdate(userId, {
            profilePic: uploadResponse.secure_url
        }, { new: true });

        await user.save();

        return res.status(200).json({ message: "Profile picture is updated" })
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const checkAuth = async (req, res) => {
    try {
        return res.status(200).json(req.user);
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
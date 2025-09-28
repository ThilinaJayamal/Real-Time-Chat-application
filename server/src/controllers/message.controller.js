import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getRecieverId } from "../lib/socket.js";
import { io } from "../lib/socket.js";

export const getUsers = async (req, res) => {
    try {
        const loggedInId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInId } }).select("-password");
        return res.status(200).json(filteredUsers);
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getMessages = async (req, res) => {
    const reciverId = req.params.id;
    const senderId = req.user._id;
    try {
        const messages = await Message.find({
            $or: [{
                reciverId: reciverId,
                senderId: senderId
            }, {
                reciverId: senderId,
                senderId: reciverId
            }]
        });
        return res.status(200).json(messages);
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const sendMessages = async (req, res) => {
    const { text, image } = req.body;
    const reciverId = req.params.id;
    const senderId = req.user.id;
    try {
        let imageUrl;

        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const message = await Message.create({
            senderId: senderId,
            reciverId: reciverId,
            text: text,
            image: imageUrl
        })

        const reciverSocketId = getRecieverId(reciverId);

        if (reciverSocketId) {
            io.to(reciverSocketId).emit("newMessage", message);

        }

        return res.status(200).json(message)
    } catch (error) {
        console.log(error?.message)
        return res.status(500).json({ message: error?.message });
    }
}
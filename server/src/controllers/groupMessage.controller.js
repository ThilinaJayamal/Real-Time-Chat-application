import Group from "../models/group.model.js";
import GroupMessage from "../models/groupMessage.model.js";
import { getRecieverId } from "../lib/socket.js";
import { io } from "../lib/socket.js";

export const sendGroupMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const { text, image } = req.body;

        const newMessage = await GroupMessage.create({
            group: id,
            text: text,
            sender: req.user?._id,
            image: image
        });

        const updatedNewMessage = await newMessage.populate({
            path:'sender',
            select:"-password"
        })

        // Get group members to emit real-time message
        const group = await Group.findById(id);
        if (group) {
            // Emit to all group members except the sender
            group.members.forEach((memberId) => {
                if (memberId.toString() !== req.user._id.toString()) {
                    const memberSocketId = getRecieverId(memberId.toString());
                    if (memberSocketId) {
                        io.to(memberSocketId).emit("newGroupMessage", updatedNewMessage);
                    }
                }
            });
        }

        return res.status(201).json(updatedNewMessage);
    } catch (error) {
        return res.status(500).json(error?.nessage);
    }
}

export const getGroupMessages = async (req, res) => {
    const { id } = req.params;
    const user = req.user;
    try {
        const group = await Group.findById(id);

        if (!group) {
            return res.status(404).json("Group not found");
        }

        const isMember = group?.members.includes(user?._id);

        if (!isMember) {
            return res.status(401).json("You're not a valid member of this group!");
        }

        const messages = await GroupMessage.find({ group: group?._id })
            .populate({
                path: "sender",
                select: "_id fullName profilePic"
            });

        return res.status(200).json(messages);
    } catch (error) {
        return res.status(500).json(error?.nessage);
    }

}

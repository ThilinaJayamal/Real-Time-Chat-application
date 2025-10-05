import Group from "../models/group.model.js";
import GroupMessage from "../models/groupMessage.model.js";

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

        return res.status(201).json(newMessage);
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

        const messages = await GroupMessage.find({ group: group?._id });

        return res.status(200).json(messages);
    } catch (error) {
        return res.status(500).json(error?.nessage);
    }

}

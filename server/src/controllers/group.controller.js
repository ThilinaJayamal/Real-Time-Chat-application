import Group from "../models/group.model.js"

export const createGroup = async (req, res) => {
    const { name, description, members, admins, profilePic } = req.body;
    try {

        if (!name) {
            return res.status(400).json("Group name is required");
        }

        const newGroup = await Group.create({
            name,
            description,
            members,
            admins,
            profilePic
        });

        res.status(201).json(newGroup);
    } catch (error) {
        res.status(500).json(error?.message);
    }
}

export const getGroups = async (req, res) => {
    try {
        const userId = req.user._id;
        const groups = await Group.find({ members: { $in: [userId] } });
        res.status(201).json(groups);
    } catch (error) {
        res.status(500).json(error?.message);
    }
}
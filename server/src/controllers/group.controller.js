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

export const updateGroup = async (req, res) => {
    const { id } = req.params;
    const { name, description, members, admins, profilePic } = req.body;
    try {

        if (!name) {
            return res.status(400).json("Group name is required");
        }
        if (members.length < 0) {
            return res.status(400).json("Members should be 1 or more");
        }
        if (admins.length < 0) {
            return res.status(400).json("Admins should be 1 or more");
        }

        const updatedObj = {
            name,
            members,
            admins
        }

        if (profilePic) {
            updatedObj.profilePic = profilePic
        }
        if (description) {
            updatedObj.description = description;
        }

        const newGroup = await Group.findByIdAndUpdate(id, updatedObj);

        res.status(201).json(newGroup);
    } catch (error) {
        res.status(500).json(error?.message);
    }
}


export const getGroups = async (req, res) => {
    try {
        const userId = req.user._id;
        const groups = await Group.find({ members: { $in: [userId] } });
        return res.status(201).json(groups);
    } catch (error) {
        return res.status(500).json(error?.message);
    }
}

export const getGroup = async (req, res) => {
    const groupId = req.params?.id;
    try {
        const userId = req.user._id?.toString();
        const group = await Group.findById(groupId)
            .populate({
                path: "members",
                select: "-password"
            });

        if (!group) {
            return res.status(201).json("Group not found!");
        }

        const membersList = group.members?.map((member) => member._id?.toString());
        const isMember = membersList.includes(userId);

        if (!isMember) {
            return res.status(201).json("You're not valid member of this group!");
        }

        return res.status(201).json(group);
    } catch (error) {
        return res.status(500).json(error?.message);
    }
}


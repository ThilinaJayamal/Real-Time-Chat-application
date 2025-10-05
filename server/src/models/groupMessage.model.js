import mongoose from "mongoose"

const groupMessageSchema = new mongoose.Schema({
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group",
        required: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    text: {
        type: String,
    },
    image: {
        type: String,
    }
}, { timestamps: true })

const GroupMessage = mongoose.model("GroupMessage", groupMessageSchema);

export default GroupMessage;
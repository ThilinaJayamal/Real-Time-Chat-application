import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
    },
    reciverId:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
    },
    text:{
        type:String,
    },
    image:{
        type:String
    }
},{timestamps:true});

const Message = mongoose.model("Messaage",messageSchema);

export default Message;
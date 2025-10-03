import mongoose, { Mongoose } from "mongoose"

const groupSchema = new mongoose.Schema({
    name:{
        type:String,
        required:this
    },
    description:{
        type:String
    },
    members:{
        type:[mongoose.Types.ObjectId],
        ref:"User"
    },
    profilePic:{
        type:String
    }
})

const Group = mongoose.model("Group",groupSchema);

export default Group;
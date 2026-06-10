import mongoose from "mongoose"

const messageSchema = mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    reciverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    message:{
        type:String,
        default:''
    },
    attachment: {
        fileName: String,
        fileType: String,
        fileData: String
    },
    
    conversationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Conversation',
        default:[]
    },
},{timestamps:true})

const Message = mongoose.model("Message",messageSchema)

export default Message;
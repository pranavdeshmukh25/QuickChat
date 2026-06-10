import Conversation from "../models/conversationModel.js";
import Message from "../models/messageSchema.js";
import { getRecieverSocketId ,io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const { messages } = req.body;
    const { id: reciverId } = req.params;
    const senderId = req.user._id;

    const textMessage = messages?.trim() || '';
    const attachmentFile = req.file;
    let attachment = null;
        console.log("Attachment file:", attachmentFile);
            if (attachmentFile) {
                attachment = {
                    fileName: attachmentFile.originalname,
                    fileType: attachmentFile.mimetype,
                    fileData: attachmentFile.buffer?.toString("base64"),
                };
            }

    if (!textMessage && !attachment) {
      return res.status(400).send({
        success: false,
        message: 'Message text or attachment is required.'
      });
    }

    let chats = await Conversation.findOne({
      participants: { $all: [senderId, reciverId] }
    });

    if (!chats) {
      chats = await Conversation.create({
        participants: [senderId, reciverId],
      });
    }

    const newMessages = new Message({
      senderId,
      reciverId,
      message: textMessage,
      attachment,
      conversationId: chats._id
    });

    if (newMessages) {
      chats.messages.push(newMessages._id);
    }

    await Promise.all([chats.save(), newMessages.save()]);

    const reciverSocketId = getRecieverSocketId(reciverId);
    if (reciverSocketId) {
      io.to(reciverSocketId).emit("newMessage", newMessages);
    }

    res.status(201).send(newMessages);
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error
    });
    console.log(`error in sendMessage ${error}`);
  }
}


export const getMessages=async(req,res)=>{
try {
    const {id:reciverId} = req.params;
    const senderId = req.user._id;

    const chats = await Conversation.findOne({
        participants:{$all:[senderId , reciverId]}
    }).populate("messages")

    if(!chats)  return res.status(200).send([]);
    const message = chats.messages;
    res.status(200).send(message)
} catch (error) {
    res.status(500).send({
        success: false,
        message: error
    })
    console.log(`error in getMessage ${error}`);
}
}
const {getConvoChunk, makeConvo, addMessage } = require("./messageControllers")
const Message = require("../models/messageModel")
const User = require("../models/userModel")
const jwt = require("jsonwebtoken")
const { editUserConvoSeen }  = require("./userControllers")

const makeSocket = (server) => {
    const io = require('socket.io')(server, {
        cors: {
            origin: "http://localhost:5000"
        }
    });


    io.on("connection", (socket) => {
        socket.on("usersRoom", (userId) => {
            console.log("USER ID RECEIVED: ", userId);
            socket.join(userId)
        })



        socket.on("joinConversation", async (info) => {
            const conversation = await Message.findOne({conversationId: info.conversationId})
            const participants = conversation.participants
            const decoded = jwt.verify(info.token, process.env.JWT_TOKEN)
            for (let i = 0; i < participants.length; i++) {
                if (participants[i]._id === decoded.id) {
                    socket.join(info.conversationId)
                    break;
                } 
            }
        })

        socket.on("requestMessage", async (info) => {
            const {token, conversationId, chunk} = info
            const res = await getConvoChunk(conversationId, chunk)
            const participants = res.participants
            const decoded = jwt.verify(token, process.env.JWT_TOKEN)
            for (let i = 0; i < participants.length; i++) {
                if (participants[i]._id === decoded.id) {
                    socket.emit("messageContents", {conversationId, messageContent: res.messages})
                    break;
                } 
            }

        })

        socket.on("addMessage", async (msgData) => {

            const {token, conversationId, message, chunk } = msgData
            const decoded = jwt.verify(token, process.env.JWT_TOKEN)
            const convoChunk = await getConvoChunk(conversationId, chunk)
            
            const participants = convoChunk.participants
            for (let i = 0; i < participants.length; i++) {
                if (participants[i]._id === decoded.id) {
                    const receiverId = i === 0 ? participants[1] : participants[0]
                    const res = await addMessage(conversationId, message, decoded.id, receiverId)
                    io.to(conversationId).emit("newMessage", {conversationId, message: message, senderId: decoded.id})
                    break;
                } 
            }            
        })

        socket.on("newConvo", async (convoData) => {
            try {
                const decoded = jwt.verify(convoData.token, process.env.JWT_TOKEN)
                const user =  await User.findById(decoded.id)
                if (user) { 
                    const res = await makeConvo(convoData.participantOne, convoData.participantOneId, convoData.participantTwo, convoData.participantTwoId)
                socket.emit("newChat", res.messages[convoData.participantTwoId])
                }
                
            } catch (err) {
                console.log(err);
            }
        }) 

        socket.on("toggleSeen", async (chatData) => {
            const {token, chatId, isSeen} = chatData

            const decoded = jwt.verify(token, process.env.JWT_TOKEN)
            const user =  await User.findById(decoded.id)
            if (user) {
            editUserConvoSeen({senderId: chatId, receiverId: decoded.id}, true)
        } 
        })

    })




}

module.exports = {makeSocket}



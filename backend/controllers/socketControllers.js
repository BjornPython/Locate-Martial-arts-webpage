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
            const {conversationId} = info
            if (!conversationId ) 
            {console.log("MISSING REQUIREMENTS: conversationId "); return}
            const conversation = await Message.findOne({conversationId})
            if (!conversation) {return}
            const participants = conversation.participants
            const decoded = jwt.verify(info.token, process.env.JWT_TOKEN)
            for (let i = 0; i < participants.length; i++) {
                if (participants[i]._id === decoded.id) {
                    socket.join(conversationId)
                    break;
                } 
            }
        })

        socket.on("requestMessage", async (info) => {
            const {token, conversationId, chunk} = info
            if (!token || !conversationId || !chunk) {console.log("MISSING REQUIREMENTS: !token || !conversationId || !chunk"); return}
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
            const {token, participantOne, participantOneId, participantTwo, participantTwoId} = convoData
            if (!token || !participantOne || !participantOneId || !participantTwo || !participantTwoId) {return}
            try {
                const decoded = jwt.verify(token, process.env.JWT_TOKEN)
                const user =  await User.findById(decoded.id)
                if (user) { 
                    const res = await makeConvo(participantOne, participantOneId, participantTwo, participantTwoId)
                console.log("RES: ", res); 
                socket.emit("newChat", res.newUserMessages.messages[convoData.participantTwoId]);
                console.log("emitting to participant two to join room");
                socket.to(participantTwoId).emit("requestJoinRoom", (res.conversationId));
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



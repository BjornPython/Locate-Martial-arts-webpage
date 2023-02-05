const {getConvoChunk, makeConvo, addMessage } = require("./messageControllers")
const Message = require("../models/messageModel")
const User = require("../models/userModel")
const jwt = require("jsonwebtoken")


const makeSocket = (server) => {
    const io = require('socket.io')(server, {
        cors: {
            origin: "http://localhost:5000"
        }
    });


    io.on("connection", (socket) => {
        console.log("NEW CLIENT CONNECTED IN BACKEND");
        socket.on("joinConversation", async (info) => {
            const conversation = await Message.findOne({conversationId: info.conversationId})
            console.log("CONVO " , conversation);
            const participants = conversation.participants
            const decoded = jwt.verify(info.token, process.env.JWT_TOKEN)
            for (let i = 0; i < participants.length; i++) {
                if (participants[i]._id === decoded.id) {
                    console.log(`JOIN CONVO VERIFIED`);
                    socket.join(info.conversationId)
                    break;
                } 
            }
        })

        socket.on("requestMessage", async (info) => {
            const res = await getConvoChunk(info.conversationId, info.chunk)
            const participants = res.participants
            const decoded = jwt.verify(info.token, process.env.JWT_TOKEN)
            for (let i = 0; i < participants.length; i++) {
                if (participants[i]._id === decoded.id) {
                    console.log(`VERIFIED`);
                    socket.emit("messageContents", res.messages)
                    break;
                } 
            }

        })

        socket.on("addMessage", async (msgData) => {
            console.log("MSGDATA: ", {message: msgData.message, sender: msgData.sender});
            console.log("sending to room: ", msgData.convoId);
            const res = await addMessage(msgData.convoId, msgData.message, msgData.sender)
            io.to(msgData.convoId).emit("newMessage", {message: msgData.message, sender: msgData.sender})
        })

        socket.on("newConvo", async (convoData) => {
            console.log("CONVODATA: ", convoData);
            try {
                const decoded = jwt.verify(convoData.token, process.env.JWT_TOKEN)
                console.log("DECODED: ", decoded);
                const user =  await User.findById(decoded.id)
                if (user) { 
                    console.log("USER EXISTS: ", user);
                    const res = await makeConvo(convoData.participantOne, convoData.participantOneId, convoData.participantTwo, convoData.participantTwoId)
                console.log("RES: ", res.messages);
                socket.emit("newChat", res.messages[convoData.participantTwoId])
                }
                
            } catch (err) {
                console.log(err);
            }
        }) 

    })




}

module.exports = {makeSocket}



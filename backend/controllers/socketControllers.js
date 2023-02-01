const {getConvoChunk, makeConvo } = require("./messageControllers")
const Message = require("../models/messageModel")


const makeSocket = (server) => {
    const io = require('socket.io')(server, {
        cors: {
            origin: "http://localhost:5000"
        }
    });


    io.on("connection", (socket) => {
        console.log("NEW CLIENT CONNECTED IN BACKEND");
        socket.on("joinConversation", (conversationId) => {
            console.log("JOINED USER");
            socket.join(conversationId)
        })

        socket.on("requestMessage", async (info) => {
            console.log("INFO RECEIVED: ", info);
            const res = await getConvoChunk(info.conversationId, info.chunk)
            console.log("RES: ", res);
            socket.emit("messageContents", res.messages)
        })

        socket.on("addMessage", (msgData) => {
            console.log("MSGDATA: ", {message: msgData.message, sender: msgData.sender});
            console.log("sending to room: ", msgData.convoId);
            io.to(msgData.convoId).emit("newMessage", {message: msgData.message, sender: msgData.sender})
        })

        socket.on("newConvo", async (convoData) => {
            console.log("CONVODATA: ", convoData);
            try {
                const res = await makeConvo(convoData.participantOne, convoData.participantOneId, convoData.participantTwo, convoData.participantTwoId)
                const newChat = await Message.findOne({conversationId: res.conversationId})
                console.log("NEW CHAT: ", newChat);
                socket.emit("newChat", newChat)
            } catch (err) {
                console.log(err);
            }
        }) 

    })




}

module.exports = {makeSocket}



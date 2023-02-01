const {getConvoChunk } = require("./messageControllers")


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
            console.log("MSGDATA: ", msgData);
            io.to(msgData.conversationId).emit("newMessage", msgData.message)
        })

    })




}

module.exports = {makeSocket}



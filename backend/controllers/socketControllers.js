
const makeSocket = (server) => {
    const io = require('socket.io')(server, {
        cors: {
            origin: "http://localhost:5000"
        }
    });


    io.on("connection", (socket) => {
        console.log("NEW CLIENT CONNECTED IN BACKEND");
        socket.emit("message", "MESSAGE RECEIVED?")
    })

    io.on("userInfo", (userInfo) => {
        console.log("RECEIVED USER INFO: ", userInfo);
    })

    io.on("requestMessage", (info) => {
        console.log("INFO RECEIVED: ", info);
    })

}

module.exports = {makeSocket}



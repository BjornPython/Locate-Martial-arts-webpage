const express = require("express")
const { errorHandler } = require("./middlewares/errorMiddleware")

const connectDB = require("./config/database")
const PORT = process.env.PORT || 8000

const cors = require("cors")


connectDB()
const app = express()
app.use(cors())
// app.use(cors({
//     origin: "http://localhost:3000",
//     "Access-Control-Allow-Origin": "http://localhost:3000",
//     methods: ["GET", "POST"],
//     allowedHeaders: ["Content-Type", "Authorization"]
// }));
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use("/api", require("./routes/Routes"))


app.use(errorHandler)


const server = app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});
const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:5000"
    }
});

io.on("connection", (socket) => {
    console.log("NEW CLIENT CONNECTED IN BACKEND");
    socket.emit("message", "MESSAGE RECEIVED?")

})
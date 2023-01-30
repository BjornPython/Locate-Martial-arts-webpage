const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")
const Message = require("../models/messageModel")


const createConvo = asyncHandler(async (req, res) => {
    console.log("IN CREATE CONVO");
    const converSationId = "sampleConversationIdadvscfsdasdasd"
    const participants = ["sample id 1", "sample id 2"]
    const chunkNumber = 0
    Message.create({
        converSationId, participants, chunkNumber
    })
    res.status(200).json({message: "SUCCESS"})
})



module.exports = {createConvo}
const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")
const Message = require("../models/messageModel")
const { v4: uuidv4 } = require('uuid');

const createConvo = asyncHandler(async (req, res) => {
    console.log("IN CREATE CONVO");
    const converSationId = uuidv4()
    const participants = ["sample id 1", "sample id 2"]
    const chunkNumber = 0
    Message.create({
        converSationId, participants, chunkNumber
    })
    res.status(200).json({message: "SUCCESS"})
})


const addMessage = asyncHandler(async (req, res) => {
    const {converSationId, newMessage} = req.body
    Message.findOneAndUpdate(
        {converSationId},
        {$push: {messages: newMessage}},
        { new: true, useFindAndModify: false }
    )
    .then(result => {
        console.log(result);
        res.status(200).json({message: "Message Added"})
    })
    .catch(error => {
        console.error(error);
        res.status(400).json({message: "Message Add failed"})
    });
})


module.exports = {createConvo, addMessage}
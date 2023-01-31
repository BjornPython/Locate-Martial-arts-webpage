const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")
const Message = require("../models/messageModel")
const { v4: uuidv4 } = require('uuid');
import { editUsersMessageChunk } from "./userControllers";

const createConvo = asyncHandler(async (req, res) => {
    console.log("IN CREATE CONVO");
    const converSationId = uuidv4()
    const {participantsIds,participantsNames }= req.body
    const participants = [
        {_id: participantsIds[0], name: participantsNames[0]}, 
        {_id: participantsIds[1], name: participantsNames[1]}]
    const chunkNumber = 0
    Message.create({
        converSationId, participants, chunkNumber
    })
    res.status(200).json({message: "SUCCESS"})
})




const addMessage = asyncHandler(async (req, res) => {
    console.log("IN ADD MESSAGE");
    const {converSationId, newMessage} = req.body
    Message.findOne({ converSationId })
    .sort({ chunkNumber: -1 })
    .then(document => {
        console.log("DOCUMENT: ", document);
        if (document.messages.length < 5) {
            Message.findOneAndUpdate(
                { _id: document._id },
                { $push: { messages: newMessage } },
                { new: true, useFindAndModify: false }
            )
                .then(result => {
                    console.log(result);
                    res.status(200).json({message: "added message to convo"})
                })
                .catch(error => {
                    console.error(error);
                    res.status(200).json({message: "FAILED to added message to convo"})
                });
        } else {
            const nextChunkNumber = document.chunkNumber + 1;
            const userIds = [document[0].participants._id, document[1].participants._id]
            const newDocument = new Message({
                converSationId,
                participants: document.participants,
                messages: [newMessage],
                chunkNumber: nextChunkNumber
            });
            newDocument.save()
                .then(result => {
                    console.log(result);
                    editUsersMessageChunk(userIds, converSationId, nextChunkNumber)
                    res.status(200).json({message: "created new chunk and added message to convo"})
                })
                .catch(error => {
                    console.error(error);
                    res.status(200).json({message: "FAILED to create new chunk and add message to convo"})
                });
        }
    })
    .catch(error => {
        console.error(error);
    });
})


module.exports = {createConvo, addMessage}
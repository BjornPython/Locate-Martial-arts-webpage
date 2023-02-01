const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")
const Message = require("../models/messageModel")
const { v4: uuidv4 } = require('uuid');
const { editUsersMessageChunk, addUserMessage } = require("./userControllers");


const getConvoChunk = asyncHandler(async (conversationId, convoChunk) => {
    const convo = await Message.findOne({conversationId, chunkNumber: convoChunk})
    console.log("CONVO: ", convo);
    return convo
})


const createConvo = asyncHandler(async (req, res) => {
    console.log("IN CREATE CONVO");
    console.log("BODY: ", req.body);
    const conversationId = uuidv4()
    const {participantOne, participantOneId, participantTwo, participantTwoId }= req.body
    const participants = [
        {_id: participantOneId, name: participantOne}, 
        {_id: participantTwoId, name: participantTwo}
    ]
    console.log("PARTICIPANTS: ", participants);
    const chunkNumber = 0


    try {
    Message.create({
    conversationId, participants, chunkNumber
        })

    const userIds = [participantOneId, participantTwoId]
    const userNames = [participantOne, participantTwo]
    addUserMessage(userIds, userNames, conversationId, chunkNumber)

    res.status(200).json({message: "SUCCESS"})


    } catch (err) {
        console.log("ERROR: ", err);
        res.status(400).json({message: "FAILED"})

    }
    
})




const addMessage = asyncHandler(async (req, res) => {
    console.log("IN ADD MESSAGE");
    console.log("REQ BODY: ", req.body);
    const {conversationId, newMessage} = req.body
    Message.findOne({ conversationId })
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
            const userIds = [document.participants[0]._id, document.participants[1]._id]
            const newDocument = new Message({
                conversationId,
                participants: document.participants,
                messages: [newMessage],
                chunkNumber: nextChunkNumber
            });
            newDocument.save()
                .then(result => {
                    console.log(result);
                    editUsersMessageChunk(userIds, nextChunkNumber)
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



module.exports = {getConvoChunk, createConvo, addMessage}
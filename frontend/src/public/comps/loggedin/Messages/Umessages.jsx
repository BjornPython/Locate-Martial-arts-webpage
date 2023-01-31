import React, { useEffect } from 'react'
import "../../../css/loggedin/umessages.css"
import UmessageUsers from './UmessageUsers'
import UuserMessage from "./UuserMessage"
import { useState } from 'react'

function Umessages({ info, getMessages }) {


    const [messages, setMessages] = useState([])
    const [convoId, setConvoId] = useState("")
    const [currentConvoChunk, setCurrentConvoChunk] = useState(null)
    const [conversation, setConversation] = useState([])


    useEffect(() => {
        console.log("INFO: ", info);
        if (!info) { return }
        setMessages(Object.entries(info.messages).map(([key, value]) => { return { userId: key, value } }))
    }, [info])

    useEffect(() => {
        console.log("MESSAGES: ", messages);
    }, [messages])

    useEffect(() => {
        if (convoId === "") { return }
        getMessages(convoId, currentConvoChunk)
    })

    useEffect(() => {
        console.log("HIGHEST CHUNK: ", currentConvoChunk);
    }, [currentConvoChunk])

    const changeConvoId = (conversationId, highestChunk) => {
        setConvoId(conversationId)
        setCurrentConvoChunk(highestChunk)
    }



    return (
        <div id='u-messages' className="u-messages">
            <div className='u-m-page'>
                <UmessageUsers messages={messages} changeConvoId={changeConvoId} />
                <hr />
                <UuserMessage />
            </div>

        </div>
    )
}

export default Umessages
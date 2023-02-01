import React, { useEffect } from 'react'
import "../../../css/loggedin/umessages.css"
import UmessageUsers from './UmessageUsers'
import UuserMessage from "./UuserMessage"
import { useState } from 'react'

function Umessages({ info, getMessages, messages, addMessage }) {

    const [userName, setUserName] = useState("") // The name of the user

    const [chats, setChats] = useState([]) // THe different chats the user has.

    const [convoId, setConvoId] = useState("") // The convoId of the current user's chat
    const [chatName, setChatName] = useState("")
    const [currentConvoChunk, setCurrentConvoChunk] = useState(null) // The highest Chunk of the current chat


    useEffect(() => {
        if (!info) { return }
        // Reorganizes the messages data from the database.
        setChats(Object.entries(info.messages).map(([key, value]) => { return { userId: key, value } }))
        setUserName(info.name)
    }, [info])



    useEffect(() => {
        if (convoId === "") { return }
        //Everytime time the convoId changes, it will request the new messages.
        getMessages(convoId, currentConvoChunk)
    }, [convoId])


    const changeConvo = (conversationId, highestChunk, convoName) => {
        // Changes the convo when the user clicks on a chat
        if (conversationId !== convoId) {
            setConvoId(conversationId)
            setCurrentConvoChunk(highestChunk)
            setChatName(convoName)
        }
    }



    return (
        <div id='u-messages' className="u-messages">
            <div className='u-m-page'>
                <UmessageUsers chats={chats} changeConvo={changeConvo} />
                <hr />
                <UuserMessage messages={messages} userName={userName} chatName={chatName}
                    addMessage={addMessage} convoId={convoId} />
            </div>

        </div>
    )
}

export default Umessages
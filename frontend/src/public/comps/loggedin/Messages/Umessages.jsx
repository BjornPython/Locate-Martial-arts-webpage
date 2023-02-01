import React, { useEffect } from 'react'
import "../../../css/loggedin/umessages.css"
import UmessageUsers from './UmessageUsers'
import UuserMessage from "./UuserMessage"
import { useState } from 'react'

function Umessages({ info, getMessages, messages }) {

    const [userName, setUserName] = useState("")

    const [chats, setChats] = useState([])

    const [convoId, setConvoId] = useState("")
    const [currentConvoChunk, setCurrentConvoChunk] = useState(null)


    useEffect(() => {
        console.log("INFO: ", info);
        if (!info) { return }
        setChats(Object.entries(info.messages).map(([key, value]) => { return { userId: key, value } }))
        setUserName(info.name)
    }, [info])



    useEffect(() => {
        if (convoId === "") { return }
        getMessages(convoId, currentConvoChunk)
    }, [convoId])

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
                <UmessageUsers chats={chats} changeConvoId={changeConvoId} />
                <hr />
                <UuserMessage messages={messages} userName={userName} />
            </div>

        </div>
    )
}

export default Umessages
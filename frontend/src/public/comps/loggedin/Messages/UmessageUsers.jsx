import React, { useEffect, useMemo } from 'react'
import "../../../css/loggedin/umessageUsers.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import uuid from 'react-uuid'


const UserMessages = ({ chat, changeConvo, messages }) => {



    const lastMessage = useMemo(() => {
        const { conversationId } = chat
        console.log("CONVO: ", messages[conversationId]);
        if ([conversationId] in messages) {
            const convoIndex = messages[conversationId].length > 0 ? messages[conversationId].length - 1 : null
            if (convoIndex) { return messages[conversationId][convoIndex].message }
            else { return "no convo yet." }
        }
        else { return "dont have last msg yet." }
    }, [messages])

    const chatMemo = useMemo(() => {
        return (
            <>
                <div className='user-icon'>
                    <FontAwesomeIcon icon={faCircle} className="profile-pic" />
                </div>

                <div className='user-info'>
                    <h3>{chat.name}</h3>
                    <div className='status-div'>
                        <FontAwesomeIcon icon={faCircle} className="active-icn" />
                        {!chat.seen
                            ? <p>{lastMessage}</p>
                            : <p style={{ color: "white", "fontWeight": "bold" }}>{lastMessage}</p>}
                    </div>
                </div>
            </>
        )
    }, [])


    return (
        <div className='user' onClick={() => {
            console.log("USER CLICKED");
            changeConvo(chat.conversationId, chat.highestChunk, chat.name)
        }}>
            {chatMemo}
        </div>
    )
}



function UmessageUsers({ chats, changeConvo, messages }) {

    return (
        <div className='u-message-page'>
            {Object.entries(chats).map(([key, value]) => {
                return <UserMessages key={key} chat={value} changeConvo={changeConvo} messages={messages} />

            })}



        </div>
    )
}

export default UmessageUsers
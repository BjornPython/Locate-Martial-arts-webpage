import React, { useEffect, useMemo } from 'react'
import "../../../css/loggedin/umessageUsers.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCircle } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import uuid from 'react-uuid'


const UserMessages = ({ chat, changeConvo, messages }) => {



    const lastMessage = useMemo(() => {
        console.log("LAST MSG RERENDERED");
        if ([chat.conversationId] in messages) { return messages[chat.conversationId][0].message }
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
                            : <p style={{ color: "white", "font-weight": "bold" }}>{lastMessage}</p>}
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
            {chats.map((chat, index) => {
                const key = uuid()
                return <UserMessages key={key} chat={chat} index={index} changeConvo={changeConvo} messages={messages} />
            })}


        </div>
    )
}

export default UmessageUsers
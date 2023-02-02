import React from 'react'
import "../../../css/loggedin/umessageUsers.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'


const userMessages = (chat, key, changeConvo) => {
    return (
        <div key={key} className='user' onClick={() => {
            changeConvo(chat.conversationId, chat.highestChunk, chat.name)
        }}>
            <div className='user-icon'>
                <FontAwesomeIcon icon={faUser} />
            </div>

            <div className='user-info'>
                <h3>{chat.name}</h3>
                <p>{"active now"}</p>
            </div>
        </div>
    )
}



function UmessageUsers({ chats, changeConvo }) {

    return (
        <div className='u-message-page'>
            {chats.map((chat, index) => {
                return userMessages(chat, index, changeConvo)
            })}


        </div>
    )
}

export default UmessageUsers
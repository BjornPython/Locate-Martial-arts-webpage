import React from 'react'
import "../../../css/loggedin/umessageUsers.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'


const userMessages = (chatInfo, status, key, changeConvo) => {
    return (
        <div key={key} className='user' onClick={() => {
            changeConvo(chatInfo.value.conversationId, chatInfo.value.highestChunk, chatInfo.value.name)
        }}>
            <div className='user-icon'>
                <FontAwesomeIcon icon={faUser} />
            </div>

            <div className='user-info'>
                <h3>{chatInfo.value.name}</h3>
                <p>{"active now"}</p>
            </div>
        </div>
    )
}



function UmessageUsers({ chats, changeConvo }) {

    return (
        <div className='u-message-page'>
            {chats.map((chatInfo, index) => {
                return userMessages(chatInfo, "sadfvcx", index, changeConvo)
            })}


        </div>
    )
}

export default UmessageUsers
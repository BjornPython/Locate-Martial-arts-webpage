import React from 'react'
import "../../../css/loggedin/umessageUsers.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'


const userMessages = (chatInfo, status, key, changeConvoId) => {
    return (
        <div key={key} className='user' onClick={() => { changeConvoId(chatInfo.value.conversationId, chatInfo.value.highestChunk) }}>
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



function UmessageUsers({ chats, changeConvoId }) {

    return (
        <div className='u-message-page'>
            {chats.map((chatInfo, index) => {
                return userMessages(chatInfo, "sadfvcx", index, changeConvoId)
            })}


        </div>
    )
}

export default UmessageUsers
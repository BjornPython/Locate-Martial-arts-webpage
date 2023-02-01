import React from 'react'
import "../../../css/loggedin/umessageUsers.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'


const userMessages = (messageInfo, status, key, changeConvoId) => {
    return (
        <div key={key} className='user' onClick={() => { changeConvoId(messageInfo.value.conversationId, messageInfo.value.highestChunk) }}>
            <div className='user-icon'>
                <FontAwesomeIcon icon={faUser} />
            </div>

            <div className='user-info'>
                <h3>{messageInfo.value.name}</h3>
                <p>{"active now"}</p>
            </div>
        </div>
    )
}



function UmessageUsers({ messages, changeConvoId }) {

    return (
        <div className='u-message-page'>
            {messages.map((messageInfo, index) => {
                return userMessages(messageInfo, "sadfvcx", index, changeConvoId)
            })}


        </div>
    )
}

export default UmessageUsers
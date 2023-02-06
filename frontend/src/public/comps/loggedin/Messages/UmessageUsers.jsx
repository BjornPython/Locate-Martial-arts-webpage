import React from 'react'
import "../../../css/loggedin/umessageUsers.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCircle } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'


const userMessages = (chat, key, changeConvo) => {
    return (
        <div key={key} className='user' onClick={() => {
            changeConvo(chat.conversationId, chat.highestChunk, chat.name)
        }}>
            <div className='user-icon'>
                <FontAwesomeIcon icon={faCircle} className="profile-pic" />
            </div>

            <div className='user-info'>
                <h3>{chat.name}</h3>
                <div className='status-div'>
                    <FontAwesomeIcon icon={faCircle} className="active-icn" /> <p> {"active now"}</p>
                    {/* <p> {"inactive"}</p> */}
                </div>
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
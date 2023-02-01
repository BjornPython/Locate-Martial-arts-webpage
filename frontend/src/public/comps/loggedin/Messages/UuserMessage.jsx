import React, { useEffect } from 'react'
import "../../../css/loggedin/uuserMessage.css"
import { useState, useMemo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { current } from '@reduxjs/toolkit'

const showCurrentChat = (userName, status) => {
    return (
        <div className='current-msg-user'>
            <div className='current-user-icon'>
                <FontAwesomeIcon icon={faUser} />
            </div>
            <div className='current-msg-user-info'>
                <h2>{userName}</h2>
                <h4>{status}</h4>
            </div>
        </div>
    )
}

const showMessage = (message, index, type = null) => {
    if (type) {
        return (
            <div key={index} className='message'>
                <h4>{message}</h4>
            </div>
        )
    } else {
        return (
            <div key={index} className='users-message'>
                <h4>{message}</h4>
            </div>
        )
    }
}


function UuserMessage({ messages, userName, chatName, addMessage, convoId }) {

    const currentChatMemo = useMemo(() => {
        return showCurrentChat(chatName, "")
    }, [chatName])


    return (
        <div id='u-user-message' className='u-user-message'>

            {currentChatMemo}

            <hr />

            <div className='u-message-contents'>
                {messages.map((msg, index) => {
                    const type = userName === msg.sender ? null : true
                    return (
                        showMessage(msg.message, index, type)
                    )
                })}
            </div>

            <hr id='u-msg-hr' />

            <div className='u-msg-input-div'>
                <form className="u-msg-form">
                    <input type="text" className='u-msg-input' />
                </form>
                <FontAwesomeIcon icon={faPaperPlane} className="send-msg-icon" onClick={() => { addMessage(convoId, "TEST MESSAGE") }} />
            </div>

        </div>
    )
}

export default UuserMessage
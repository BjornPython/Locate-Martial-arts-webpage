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


function UuserMessage({ currentMessages, userId, chatName, addMessage }) {

    const currentChatMemo = useMemo(() => {
        return showCurrentChat(chatName, "")
    }, [chatName])

    const [formsValue, setFormsValue] = useState({ msgVal: "" })
    const { msgVal } = formsValue



    const resetMsgVal = () => {
        setFormsValue({ msgVal: "" })
    }
    const handleMsgChange = (e) => {

        setFormsValue({
            ...formsValue,
            msgVal: e.target.value
        });
    };

    const messagesMemo = useMemo(() => {

        return (
            currentMessages.map((msg, index) => {
                const type = userId === msg.senderId ? null : true
                return (
                    showMessage(msg.message, index, type)
                )
            })
        )
    }, [currentMessages])

    return (
        <div id='u-user-message' className='u-user-message'>

            {currentChatMemo}

            <hr />

            <div className='u-message-contents'>
                {messagesMemo}
            </div>

            <hr id='u-msg-hr' />

            <div className='u-msg-input-div'>
                <form className="u-msg-form" onSubmit={(e) => { e.preventDefault(); addMessage(msgVal); resetMsgVal() }}>
                    <input type="text" name="msgVal" value={msgVal} className='u-msg-input' onChange={handleMsgChange} />
                </form>
                <FontAwesomeIcon icon={faPaperPlane} className="send-msg-icon" onClick={() => { addMessage(msgVal); resetMsgVal() }} />
            </div>

        </div>
    )
}

export default UuserMessage
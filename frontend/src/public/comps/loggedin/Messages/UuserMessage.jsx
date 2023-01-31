import React from 'react'
import "../../../css/loggedin/uuserMessage.css"
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faPaperPlane } from '@fortawesome/free-solid-svg-icons'

const showCurrentChat = (userName, status, key) => {
    return (
        <div className='current-msg-user' key={key}>
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


function UuserMessage() {

    const [currentChat, setCurrentChat] = useState({ userName: "Nathan Flores", status: "Active now", key: 1 })
    const { userName, status, key } = currentChat

    const [messages, setMessages] = useState([
        { message: "This is the first message.", type: 1 },
        { message: "This is the second message, it is a bit longer than the first one.", type: 1 },
        { message: "This is the third message, it is even longer than the second one.", type: 1 },
        { message: "This is the fourth message." },
        { message: "This is the fifth message.", type: 1 },
        { message: "This is the sixth message." },
        { message: "This is the seventh message.", type: 1 },
        { message: "This is the eighth message." },
        { message: "This is the ninth message." },
        { message: "This is the tenth message.", type: 1 }
    ])


    return (
        <div id='u-user-message' className='u-user-message'>

            {showCurrentChat(userName, status, key)}

            <hr />

            <div className='u-message-contents'>
                {messages.map((msg, index) => {
                    return (
                        showMessage(msg.message, index, msg.type)
                    )
                })}
            </div>

            <hr id='u-msg-hr' />

            <div className='u-msg-input-div'>
                <form className="u-msg-form">
                    <input type="text" className='u-msg-input' />
                </form>
                <FontAwesomeIcon icon={faPaperPlane} className="send-msg-icon" />
            </div>

        </div>
    )
}

export default UuserMessage
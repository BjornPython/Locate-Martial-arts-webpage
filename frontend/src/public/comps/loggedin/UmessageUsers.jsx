import React from 'react'
import "../../css/loggedin/umessageUsers.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

const userMessages = (userName, status) => {
    return (
        <div className='user'>
            <div className='user-icon'>
                <FontAwesomeIcon icon={faUser} />
            </div>

            <div className='user-info'>
                <h3>{userName}</h3>
                <p>{status}</p>
            </div>
        </div>
    )
}



function UmessageUsers() {
    const [messages, setMessages] = useState([
        { userName: "nate", status: "active now" },
        { userName: "jeff", status: "active now" },
        { userName: "chan", status: "active now" },
        { userName: "kev", status: "active now" },
        { userName: "curt", status: "active now" },
        { userName: "rob", status: "active now" }

    ])
    return (
        <div className='u-message-page'>
            {messages.map((message) => {
                return userMessages(message.userName, message.status)
            })}
        </div>
    )
}

export default UmessageUsers
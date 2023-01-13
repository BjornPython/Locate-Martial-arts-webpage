import React from 'react'
import "../../css/loggedin/uuserMessage.css"
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

const showCurrentUser = (userName, status, key) => {
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



function UuserMessage() {

    const [currentUser, setCurrentUser] = useState({ userName: "Nathan Flores", status: "Active now", key: 1 })

    const { userName, status, key } = currentUser

    return (
        <div className='u-user-message'>

            {showCurrentUser(userName, status, key)}

            <hr />

            <div className='u-message-contents'>
                <h1>msg</h1>
            </div>
        </div>
    )
}

export default UuserMessage
import React from 'react'
import "../../css/loggedin/umessages.css"
import UmessageUsers from './UmessageUsers'
import UuserMessage from "./UuserMessage"
function Umessages() {
    return (
        <div className="u-messages">
            <div className='u-m-page'>
                <UmessageUsers />
                <hr />
                <UuserMessage />
            </div>

        </div>
    )
}

export default Umessages
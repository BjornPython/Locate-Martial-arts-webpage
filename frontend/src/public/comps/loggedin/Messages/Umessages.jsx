import React, { useEffect } from 'react'
import "../../../css/loggedin/umessages.css"
import UmessageUsers from './UmessageUsers'
import UuserMessage from "./UuserMessage"
import { useState } from 'react'

function Umessages({
    chats, changeConvo, currentMessages, addMessage, userId, chatName,
    convoId
}) {








    return (
        <div id='u-messages' className="u-messages">
            <div className='u-m-page'>
                <UmessageUsers chats={chats} changeConvo={changeConvo} />
                <hr />
                <UuserMessage currentMessages={currentMessages} userId={userId} chatName={chatName}
                    addMessage={addMessage} convoId={convoId} />
            </div>

        </div>
    )
}

export default Umessages
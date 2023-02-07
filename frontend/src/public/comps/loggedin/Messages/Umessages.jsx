import React, { useEffect, useMemo } from 'react'
import "../../../css/loggedin/umessages.css"
import UmessageUsers from './UmessageUsers'
import UuserMessage from "./UuserMessage"
import { useState } from 'react'

function Umessages({
    chats, changeConvo, currentMessages, addMessage, userId, chatName,
    convoId, messages
}) {

    const uMessageUsersMemo = useMemo(() => {
        return (
            <UmessageUsers chats={chats} changeConvo={changeConvo} messages={messages} />
        )
    }, [chats, messages])


    return (
        <div id='u-messages' className="u-messages">
            <div className='u-m-page'>
                {uMessageUsersMemo}
                <hr />
                <UuserMessage currentMessages={currentMessages} userId={userId} chatName={chatName}
                    addMessage={addMessage} convoId={convoId} />
            </div>

        </div>
    )
}

export default Umessages
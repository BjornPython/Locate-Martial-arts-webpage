import React from 'react'
import "../../css/loggedin/unav.css"
import { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { fa } from "@fortawesome/free-brands-svg-icons"

import { faSearch, faUser, faMessage, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

const IconsComp = ({ page, callChangePage }) => {

    const [showSpan, setShowSpan] = useState(false)

    return (
        <div className="u-n-icon profile-btn" onClick={() => { callChangePage(page); setShowSpan(!showSpan) }}>
            <span className={`profile-btn-span ${showSpan && "profile-btn-span-active"}`}></span>
            <FontAwesomeIcon icon={faUser} className="nav-icns" />
        </div>
    )

}

function Unav({ changePage }) {

    const callChangePage = (page) => {
        changePage(page)
    }


    return (
        <div className='u-navbar'>
            <div className="u-n-icon sign-out-btn"> <FontAwesomeIcon className='' icon={faSignOutAlt} /></div>

            <div className="u-navbar-icons">

                <div className="u-n-icon "> <FontAwesomeIcon icon={faSearch} className="nav-icns" /></div>
                <IconsComp page="profile" callChangePage={callChangePage} />
                <div className="u-n-icon messages-btn" onClick={() => { callChangePage("messages") }}><span></span><FontAwesomeIcon icon={faMessage} className="nav-icns" /></div>
            </div>



        </div >
    )
}

export default Unav
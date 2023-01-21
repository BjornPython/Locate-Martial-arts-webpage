import React from 'react'
import "../../css/loggedin/unav.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { fa } from "@fortawesome/free-brands-svg-icons"

import { faSearch, faUser, faMessage } from '@fortawesome/free-solid-svg-icons'


function Unav({ setCurrentPage }) {

    const setPage = (page) => {
        setCurrentPage(page)
    }

    return (
        <div className='u-navbar'>

            <div className="u-navbar-icons">
                <div className="u-n-icon "> <FontAwesomeIcon className='' icon={faSearch} /></div>
                <div className="u-n-icon profile-btn" onClick={() => { setPage("profile") }}> <FontAwesomeIcon icon={faUser} /></div>
                <div className="u-n-icon messages-btn" onClick={() => { setPage("messages") }}><FontAwesomeIcon icon={faMessage} /></div>
            </div>



        </div >
    )
}

export default Unav
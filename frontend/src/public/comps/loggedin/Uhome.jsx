import React from 'react'
import Unav from './Unav'
import Umessages from './Umessages'
import "../../css/loggedin/uhome.css"
function Uhome() {
    return (
        <div className='uhome-page'>
            <Unav />
            <Umessages />
        </div>
    )
}

export default Uhome
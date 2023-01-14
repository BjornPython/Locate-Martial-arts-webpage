import React from 'react'
import Unav from './Unav'
import Umessages from './Umessages'
import Uprofile from './Uprofile'
import "../../css/loggedin/uhome.css"

function Uhome() {
    return (
        <div className='uhome-page'>
            <Unav />
            <div className="u-home-pages">
                {/* <Umessages />    */}
                <Uprofile />
            </div>

        </div>
    )
}

export default Uhome
import React, { useState } from 'react'
import "../../css/loggedin/uprofile.css"
import GprofileBox from './GprofileBox'

function Gprofile({ name, bio }) {

    return (
        <div id='u-profile-page' className='u-profile-page'>
            <GprofileBox name={name} bio={bio} />


        </div>
    )
}

export default Gprofile
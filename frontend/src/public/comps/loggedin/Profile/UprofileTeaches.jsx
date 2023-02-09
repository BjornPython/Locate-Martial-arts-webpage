import React, { useState } from 'react'
import { useMemo } from 'react'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import uuid from 'react-uuid'
const ShowTeaches = ({ art, showSpan }) => {

    return (
        <div className="teaches-mart">
            <span>

            </span>
            <h4>{art}</h4>
        </div>
    )
}

function UprofileTeaches() {
    const diffArts = ["Muay Thai", "Kickboxing", "Mixed Martial Arts", "Brazilian Jiu Jitsu",
        "Boxing", "Karate", "Wrestling", "Sambo"]

    const [selectedArts, setSelectedArts] = useState([])



    return (
        <div className='u-profile-teaches'>

            <div className='teaches-dropdown-btn'>
                <h4>Teaches... </h4>
                <FontAwesomeIcon icon={faCaretDown} />
            </div>

            <div className='teaches-dropdown'>
                {diffArts.map((mart) => {
                    const teachesKey = uuid()
                    return <ShowTeaches key={teachesKey} art={mart} />
                })}
            </div>

        </div>
    )
}

export default UprofileTeaches
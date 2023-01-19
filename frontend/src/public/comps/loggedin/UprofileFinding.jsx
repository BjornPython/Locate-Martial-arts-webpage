import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import uuid from 'react-uuid'
const displayMart = (mart, setFunction) => {

    return (
        <div className='u-display-mart' key={uuid()} onClick={() => { console.log(`${mart} clicked`) }}>
            <span className='u-mart-span'></span>
            <h4>{mart}</h4>
        </div>
    )
}


function UprofileFinding({ setNewUserInfo }) {
    const [spartnerIn, setSpartnerIn] = useState(["Kickboxing", "Muay thai", "BJJ"])
    const [coachIn, setCoachIn] = useState(["Kickboxing", "Muay thai", "BJJ"])
    return (
        <div className="looking-for">
            <div className="u-for">
                <h4>Looking for a Sparring Partner:</h4>
                <div className='dropdowns-div'>
                    <div id='spartner-div' className='looking-for-dropdown'>
                        <h4>Sparring partner in...</h4>
                        <FontAwesomeIcon icon={faCaretDown} />
                    </div>

                    <div id="spartner-dropdown" className="spar-dropdown">
                        {spartnerIn.map(mart => { return displayMart(mart, setSpartnerIn) })}
                    </div>
                </div>

            </div>

            <div className="u-for">
                <h4>Looking for a Coach:</h4>
                <div className='dropdowns-div'>
                    <div id="coach-div" className='looking-for-dropdown'>
                        <h4>Sparring partner in...</h4>
                        <FontAwesomeIcon icon={faCaretDown} />
                    </div>

                    <div id="coach-dropdown" className="spar-dropdown">
                        {coachIn.map(mart => { return displayMart(mart, setCoachIn) })}
                    </div>
                </div>

            </div>

        </div>
    )
}

export default UprofileFinding
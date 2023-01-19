import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import uuid from 'react-uuid'
const displayMart = (mart) => {
    return (
        <div className='u-display-mart' key={uuid()} onClick={() => { console.log(`${mart} clicked`) }}>
            <span className='u-mart-span'></span>
            <h4>{mart}</h4>
        </div>
    )
}


function UprofileFinding() {
    const [spartnerIn, setSpartnerIn] = useState(["Kickboxing", "Muay thai", "BJJ"])
    return (
        <div className="looking-for">
            <div className="u-for">
                <h4>Looking for a Sparring Partner:</h4>
                <div className='dropdowns-div'>
                    <div className='looking-for-dropdown'>
                        <h4>Sparring partner in...</h4>
                        <FontAwesomeIcon icon={faCaretDown} />
                    </div>

                    <div className="spar-dropdown">
                        {spartnerIn.map(mart => { return displayMart(mart) })}
                    </div>
                </div>

            </div>

            <div className="u-for">
                <h4>Looking for a Coach:</h4>
                <div className='dropdowns-div'>
                    <div className='looking-for-dropdown'>
                        <h4>Sparring partner in...</h4>
                        <FontAwesomeIcon icon={faCaretDown} />
                    </div>

                    <div className="spar-dropdown">
                        {spartnerIn.map(mart => { return displayMart(mart) })}
                    </div>
                </div>

            </div>

        </div>
    )
}

export default UprofileFinding
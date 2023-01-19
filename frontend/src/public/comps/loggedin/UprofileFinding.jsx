import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import uuid from 'react-uuid'

import UdisplayMart from './UdisplayMart'



function UprofileFinding({ lfSparArts, lfcoachArts, setNewUserInfo }) {

    const updateLfSpartner = (mart) => {
        console.log(Object.keys(lfSparArts));
        if (Object.keys(lfSparArts).includes(mart)) {
            // remove
            console.log("MART ALREADY IN ARTS");
        } else { console.log("MART NOT IN ARTS"); }
        // add
    }
    const updateLfCoach = (mart) => {
        if (Object.keys(lfcoachArts).includes(mart)) {
            // remove
            console.log("MART ALREADY IN ARTS");
        } else { console.log("MART NOT IN ARTS"); }
        // add
    }

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
                        {Object.keys(lfSparArts).map(mart => { return <UdisplayMart key={uuid()} mart={mart} setFunction={updateLfSpartner} /> })}
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
                    <div id="coach-dropdown" className="spar-dropdown ">
                        {Object.keys(lfcoachArts).map(mart => { return <UdisplayMart key={uuid()} mart={mart} setFunction={updateLfCoach} /> })}

                    </div>
                </div>

            </div>

        </div>
    )
}

export default UprofileFinding
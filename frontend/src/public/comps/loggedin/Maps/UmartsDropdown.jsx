import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'



const DropdownMart = ({ mart, toggleLookingForMart }) => {
    const [showSpan, setShowSpan] = useState(false)

    const toggleSpan = () => {
        setShowSpan(!showSpan)
    }

    return (
        <div className='u-marts-div' onClick={() => {
            toggleSpan();
            toggleLookingForMart(mart);
        }}>
            <span className={`u-lf-span ${showSpan && "u-lf-span-active"}`}></span>
            <h4>{mart}</h4>
        </div>
    )
}

const DropDownMarts = ({ showDropdown, toggleLookingForMart }) => {
    const marts = ["Muay Thai", "Kickboxing", "Mixed Martial Arts", "Brazilian Jiu Jitsu",
        "Boxing", "Karate", "Wrestling", "Sambo"]

    if (showDropdown) {
        return (
            <div className='u-lf-marts-dropdown'>
                {marts.map((mart, index) => {
                    return (<DropdownMart key={index} mart={mart} toggleLookingForMart={toggleLookingForMart} />)
                })}
            </div>
        )
    }

}




function UmartsDropdown() {

    const [showDropdown, setShowDropdown] = useState(false)

    const [lookingForMarts, setLookingForMarts] = useState([])

    useEffect(() => {
        console.log("NEW LOOKING FOR MARTS: ", lookingForMarts);
    }, [lookingForMarts])

    const toggleLookingForMart = (mart) => {
        setLookingForMarts((prevState) => {
            if (prevState.includes(mart)) {
                const newState = prevState.filter(value => value !== mart)
                return newState
            } else {
                const newState = [...prevState, mart]
                return newState
            }
        })
    }


    const toggleShowDropdown = () => {
        setShowDropdown(!showDropdown)
    }

    return (
        <div className='u-lf-marts-div'>
            <div className='u-lf-marts-box' onClick={toggleShowDropdown}>
                <h3>Selected Arts...</h3>
                <FontAwesomeIcon icon={faCaretDown} className="selected-arts-icon" />
            </div>

            <DropDownMarts showDropdown={showDropdown} toggleLookingForMart={toggleLookingForMart} />
        </div>

    )
}

export default UmartsDropdown
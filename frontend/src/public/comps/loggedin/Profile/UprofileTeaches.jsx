import React, { useEffect, useState } from 'react'
import { useMemo } from 'react'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import uuid from 'react-uuid'
const ShowTeaches = ({ art, showSpan, toggleTeachesArt }) => {

    const [span, setSpan] = useState(showSpan)

    const toggleSpan = () => {
        setSpan(!span)
    }

    useEffect(() => {
        console.log("NEW SPAN: ", span);
    }, [span])

    return (
        <div className={`teaches-mart ${span ? "teaches-mart-active" : ""}`} onClick={() => { toggleSpan(); toggleTeachesArt(art) }}>
            <span >

            </span>
            <h4>{art}</h4>
        </div>
    )
}

function UprofileTeaches() {
    const diffArts = ["Muay Thai", "Kickboxing", "Mixed Martial Arts", "Brazilian Jiu Jitsu",
        "Boxing", "Karate", "Wrestling", "Sambo"]

    const [selectedArts, setSelectedArts] = useState([])

    const toggleTeachesArt = (art) => {
        console.log("TOGGLING");
        if (selectedArts.includes(art)) {
            setSelectedArts(prevArts => { return prevArts.filter(selectedArt => (selectedArt !== art)) })
        } else {
            setSelectedArts(prevArts => { return [...prevArts, art] })
        }
    }

    useEffect(() => {
        console.log("NEW SELECTED ARTS: ", selectedArts);
    }, [selectedArts])

    const teachesArtMemo = useMemo(() => {

        return (diffArts.map((mart) => {
            const teachesKey = uuid()
            return (<ShowTeaches key={teachesKey} art={mart} toggleTeachesArt={toggleTeachesArt}
                showSpan={selectedArts.includes(mart) ? true : false} />)
        }))

    }, [])

    return (
        <div className='u-profile-teaches'>

            <div className='teaches-dropdown-btn'>
                <h4>You Teach... </h4>
                <FontAwesomeIcon icon={faCaretDown} />
            </div>

            <div className='teaches-dropdown'>
                {teachesArtMemo}
            </div>

        </div>
    )
}

export default UprofileTeaches
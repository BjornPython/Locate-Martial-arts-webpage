import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMemo, useState } from 'react'
import uuid from 'react-uuid'
import { useEffect } from 'react'
import UdisplayMart from './UdisplayMart'



function UprofileFinding({ lfSparArts, lfcoachArts, updateLfSpartner, updateLfCoach }) {

    const [darkenSpar, setDarkenSpar] = useState(false)
    const [darkenCoach, setDarkenCoach] = useState(false)

    const [showSpar, setShowSpar] = useState(false)
    const [showCoach, setShowCoach] = useState(false)

    const diffArts = ["Muay Thai", "Kickboxing", "Mixed Martial Arts", "Brazilian Jiu Jitsu",
        "Boxing", "Karate", "Wrestling", "Sambo"]

    const diffArtsMemo = useMemo(() => {
        return diffArts.map(mart => {
            return <UdisplayMart key={uuid()} mart={mart}
                setFunction={updateLfSpartner}
                setSpan={Object.keys(lfSparArts).includes(mart) ? true : false} />
        })
    }, [diffArts])

    useEffect(() => {
        if (Object.keys(lfSparArts).length > 0) {
            setDarkenSpar(true)
        } else { setDarkenSpar(false) }
    }, [lfSparArts])

    useEffect(() => {
        if (Object.keys(lfcoachArts).length > 0) {
            setDarkenCoach(true)
        } else { setDarkenCoach(false) }
    }, [lfcoachArts])


    return (
        <div className="looking-for">
            <div className="u-for">
                <h4 className='u-for-h' style={{ color: `${darkenSpar ? "black" : "gray"}` }}>Looking for a Sparring Partner:</h4>
                <div className='dropdowns-div' >
                    <div id='spartner-div' className={`looking-for-dropdown ${darkenSpar ? "looking-for-dropdown-has" : null}`}
                        onClick={() => { setShowSpar(!showSpar) }}>
                        <h4>Sparring partner in...</h4>
                        <FontAwesomeIcon icon={faCaretDown} />
                    </div>

                    <div id="spartner-dropdown"
                        className={`spar-dropdown ${darkenSpar ? "spar-dropdown-has" : ""} ${showSpar ? "spar-dropdown-active" : ""}`}>
                        {diffArtsMemo}
                    </div>
                </div>

            </div>
            {/* 
            <div className="u-for">
                <h4 className='u-for-h' style={{ color: `${darkenCoach ? "black" : "gray"}` }}>Looking for a Coach:</h4>
                <div className='dropdowns-div' >
                    <div id="coach-div" className={`looking-for-dropdown ${darkenCoach ? "looking-for-dropdown-has" : null}`}
                        onClick={() => { setShowCoach(!showCoach) }}>
                        <h4>Coach in...</h4>
                        <FontAwesomeIcon icon={faCaretDown} />
                    </div>
                    {console.log("DARKEN COACH: ", darkenCoach)}
                    <div id="coach-dropdown" className={`spar-dropdown ${darkenCoach ? "spar-dropdown-has" : null} ${showCoach ? "spar-dropdown-active" : ""}`}>
                        {
                            diffArts.map(mart => {
                                return <UdisplayMart key={uuid()} mart={mart}
                                    setFunction={updateLfCoach}
                                    setSpan={Object.keys(lfcoachArts).includes(mart) ? true : false} />
                            })}

                    </div>
                </div>

            </div> */}

        </div>
    )
}

export default UprofileFinding
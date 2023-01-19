import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import uuid from 'react-uuid'
import { useEffect } from 'react'
import UdisplayMart from './UdisplayMart'



function UprofileFinding({ lfSparArts, lfcoachArts, setNewUserInfo }) {

    const [darkenSpar, setDarkenSpar] = useState(false)
    const [darkenCoach, setDarkenCoach] = useState(false)

    console.log("LFS: ", lfSparArts, lfcoachArts);
    useEffect(() => {
        if (lfSparArts !== null && lfSparArts !== undefined) {
            setDarkenSpar(Object.keys(lfSparArts).length > 0 ? true : false)

        } else {
            setDarkenSpar(false)
        }
    }, [lfSparArts])

    useEffect(() => {
        if (lfcoachArts !== null && lfcoachArts !== undefined) {
            setDarkenCoach(Object.keys(lfcoachArts).length > 0 ? true : false)
            console.log("DARKEN COACH RES: ", darkenCoach);

        } else {
            setDarkenCoach(false)
            console.log("DARKEN COACH RES: ", darkenCoach);
        }
    }, [lfcoachArts])


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
                <h4 className='u-for-h' style={{ color: `${darkenSpar ? "black" : "gray"}` }}>Looking for a Sparring Partner:</h4>
                <div className='dropdowns-div'>
                    <div id='spartner-div' className={`looking-for-dropdown ${darkenSpar ? "looking-for-dropdown-has" : null}`}>
                        <h4>Sparring partner in...</h4>
                        <FontAwesomeIcon icon={faCaretDown} />
                    </div>

                    <div id="spartner-dropdown" className={`spar-dropdown ${darkenSpar ? "spar-dropdown-has" : null}`}>
                        {lfSparArts !== null && lfSparArts !== undefined && Object.keys(lfSparArts).map(mart => {
                            return <UdisplayMart key={uuid()} mart={mart}
                                setFunction={updateLfSpartner}
                                setSpan={Object.keys(lfSparArts).includes(mart) ? true : false} />
                        })}
                    </div>
                </div>

            </div>

            <div className="u-for">
                <h4 className='u-for-h' style={{ color: `${darkenCoach ? "black" : "gray"}` }}>Looking for a Coach:</h4>
                <div className='dropdowns-div'>
                    <div id="coach-div" className={`looking-for-dropdown ${darkenCoach ? "looking-for-dropdown-has" : null}`}>
                        <h4>Sparring partner in...</h4>
                        <FontAwesomeIcon icon={faCaretDown} />
                    </div>
                    {console.log("DARKEN COACH: ", darkenCoach)}
                    <div id="coach-dropdown" className={`spar-dropdown ${darkenCoach ? "spar-dropdown-has" : null}`}>
                        {lfcoachArts !== null && lfcoachArts !== undefined && Object.keys(lfcoachArts).map(mart => {
                            return <UdisplayMart key={uuid()} mart={mart}
                                setFunction={updateLfCoach}
                                setSpan={Object.keys(lfcoachArts).includes(mart) ? true : false} />
                        })}

                    </div>
                </div>

            </div>

        </div>
    )
}

export default UprofileFinding
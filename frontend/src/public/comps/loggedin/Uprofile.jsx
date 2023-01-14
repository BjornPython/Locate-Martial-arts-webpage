import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faGear, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

import "../../css/loggedin/uprofile.css"


const showMart = (mart, key) => {
    return (<h3 key={key}>● {mart}</h3>)
}

const showAward = (award, key) => {
    return (<h3 key={key}>● {award}</h3>)
}



function Uprofile() {

    const [userInfo, setUserInfo] = useState({
        name: "",
        bio: "",
        location: {},
        lfspar: false,
        lfSparArts: { "kickboxing": true },
        lfcoach: false,
        lfcoachArts: {},
        marts: {
            "kickboxing": true,
            "muay thai": true,
        },
        awards: ["champion in mma", "2nd runner up kickboxing"]
    })


    const { lfSparArts, lfcoachArts, marts, awards } = userInfo

    return (
        <div className='u-profile-page'>

            <div className='profile-box'>
                <div className='profile'>
                    <FontAwesomeIcon icon={faUser} className="profile-avatar" />
                    <div className='profile-info'>
                        <h2>Name</h2>
                        <p>bio</p>
                    </div>
                </div>
                <FontAwesomeIcon icon={faGear} className="p-setting-icon" />
            </div>

            <div className="u-profile-contents">
                <div className="looking-for">
                    <div className={Object.keys(lfSparArts).length < 1 ? "u-for" : "u-for lf-active"}>
                        <h3>Looking for a Sparring Partner:</h3>
                        <h4 className='looking-for-dropdown'>Sparring partner in...  <FontAwesomeIcon icon={faCaretDown} /></h4>
                        <div className="spar-dropdown">
                        </div>
                    </div>

                    <div className={Object.keys(lfcoachArts).length < 1 ? "u-for" : "u-for lf-active"}>
                        <h3>Looking for a Coach:</h3>
                        <h4 className='looking-for-dropdown'>Coach in...  <FontAwesomeIcon icon={faCaretDown} /></h4>
                        <div className="spar-dropdown">
                        </div>
                    </div>
                </div>

                <span />

                <div className='u-profile-marts'>
                    <h2>Martial Arts:</h2>
                    <div className='u-profile-grp'>
                        <div className='profile-marts-box'>
                            {console.log(marts)}
                            {Object.keys(marts).map((mart, key, index) => {
                                return showMart(mart, index)
                            })}
                        </div>
                        <FontAwesomeIcon icon={faGear} className="p-setting-icon" />
                    </div>
                </div>

                <p>People can see your martial arts when they check your profile.</p>
                <span />

                <div className='u-profile-marts'>
                    <h2>Awards:</h2>
                    <div className='u-profile-grp'>
                        <div className='profile-marts-box'>
                            {awards.map((award, index) => {
                                return showAward(award, index)
                            })}
                        </div>
                        <FontAwesomeIcon icon={faGear} className="p-setting-icon" />
                    </div>
                </div>

                <p>People can see your martial arts when they check your profile.</p>
                <span />
                <div className='u-profile-marts'>
                    <h2>Area Location:</h2>
                    <div className='u-profile-grp'>
                        <h2 className='user-loc'>Cainta Greenpark, Cainta Rizal</h2>
                        <FontAwesomeIcon icon={faGear} className="p-setting-icon" />
                    </div>
                </div>
                <p>Help people near you connect with you. Pin your area on the maps to set. </p>
                <span />
            </div>
        </div>
    )
}

export default Uprofile
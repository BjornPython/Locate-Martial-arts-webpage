import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faGear, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

import "../../css/loggedin/uprofile.css"


const showMart = (mart, key) => {
    return (<h4 key={key}>● {mart}</h4>)
}

const showAward = (award, key) => {
    return (<h4 key={key}>● {award}</h4>)
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
        awards: ["Blue belt in BJJ", "champion in mma", "2nd runner up kickboxing"]
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
                        <h4>Looking for a Coach:</h4>
                        <h4 className='looking-for-dropdown'>Coach in...  <FontAwesomeIcon icon={faCaretDown} /></h4>
                        <div className="spar-dropdown">
                        </div>
                    </div>
                </div>

                <span />

                <div className='u-profile-marts'>
                    <h4>Martial Arts:</h4>
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
                    <h4>Achievements:</h4>
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
                    <h4>Area Location:</h4>
                    <div className='u-profile-grp'>
                        <h4 className='user-loc'>Cainta Greenpark, Cainta Rizal</h4>
                        <FontAwesomeIcon icon={faGear} className="p-setting-icon" />
                    </div>
                </div>
                <p>Help people near you connect with you. Pin your area on the maps to set. </p>
                <span />

                <div className='u-profile-marts'>
                    <h4>Account Status:</h4>
                    <div className="u-status">
                        <div className="what-status"><h4>coach</h4></div>
                        <div className="what-status"><h4>student</h4></div>
                    </div>
                </div>

                <p>Help people near you connect with you. Pin your area on the maps to set. </p>
                <span />
            </div>
        </div>
    )
}

export default Uprofile
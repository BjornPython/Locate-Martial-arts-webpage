import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faGear, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import uuid from 'react-uuid'
import "../../css/loggedin/uprofile.css"
import apiService from '../../../features/apis/apiService'


// Shows the martial arts of the user. 
const showMart = (mart, id) => {
    return (<h4 key={id}>● {mart}</h4>)
}

// Shows the awards of the user.
const showAward = (mart, id) => {
    return (<h4 key={id}>● {mart}</h4>)
}




function Uprofile({ user }) {

    // gets the user's information by requesting a GET request to the backend.
    const getUserInfo = async () => {
        const response = await apiService.getUserInfo(user);
        console.log(response.data);
        setUserInfo(response.data);
        // setNewUserInfo(response.data);

    }

    // Used when the dom is first loaded. will only display userInfo once the
    // user's information from the backend is received and set.
    const [displayInfo, setDisplayInfo] = useState(false)

    // Initial values for userInfo and setUserInfo.
    const [userInfo, setUserInfo] = useState({
        name: "",
        bio: "",
        location: {},
        lfspar: false,
        lfSparArts: {},
        lfcoach: false,
        lfcoachArts: {},
        marts: {},
        awards: []
    })

    // has the initial value of userInfo. information here will be displayed in the
    // user's profile. 
    const [newUserInfo, setNewUserInfo] = useState(userInfo)

    const { name, bio, lfSparArts, lfcoachArts, marts, awards } = newUserInfo

    // Will be used in handling form changes when editing user's profile.
    const handleNewUserInfo = ((e) => {
        setNewUserInfo((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    })




    useEffect(() => {
        const setProfileData = async () => {
            await getUserInfo();
            setDisplayInfo(true)
        }
        setProfileData()
    }, [displayInfo])


    return (
        <div className='u-profile-page'>
            <div className='profile-box'>
                <div className='profile'>
                    <FontAwesomeIcon icon={faUser} className="profile-avatar" />
                    <div className='profile-info'>
                        <h2>{name}</h2>
                        {console.log("BIO", bio)}
                        <p >{(bio === "" || bio === undefined) ? "Edit your bio" : bio}</p>
                    </div>
                </div>
            </div>

            <div className="looking-for">
                <div className="u-for">
                    <h4>Looking for a Sparring Partner:</h4>
                    <h4 className='looking-for-dropdown'>Sparring partner in...  <FontAwesomeIcon icon={faCaretDown} /></h4>
                    <div className="spar-dropdown">
                    </div>
                </div>

                <div className="u-for">
                    <h4>Looking for a Coach:</h4>
                    <h4 className='looking-for-dropdown'>Coach in...  <FontAwesomeIcon icon={faCaretDown} /></h4>
                    <div className="spar-dropdown">
                    </div>
                </div>
            </div>

            <div className="u-profile-contents">
                <FontAwesomeIcon icon={faGear} className="p-setting-icon" />
                <div className='u-profile-marts'>
                    <h4>Martial Arts:</h4>
                    <div className='u-profile-grp'>
                        <div className='profile-marts-box'>

                            {Object.keys(marts).map((mart, val) => {
                                const id = uuid()
                                return showMart(mart, id)
                            })}


                        </div>
                    </div>
                </div>

                <p>People can see your martial arts when they check your profile.</p>
                <span />

                <div className='u-profile-marts'>
                    <h4>Achievements:</h4>
                    <div className='u-profile-grp'>
                        <div className='profile-marts-box'>
                            {awards.map((award, val) => {
                                const id = uuid()
                                return showAward(award, id)
                            })}
                        </div>
                    </div>
                </div>

                <p>People can see your martial arts when they check your profile.</p>
                <span />
                <div className='u-profile-marts'>
                    <h4>Area Location:</h4>
                    <div className='u-profile-grp'>
                        <h4 className='user-loc'>Cainta Greenpark, Cainta Rizal</h4>
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

                <p>Are you a coach or a student?</p>
                <span />
                {console.log("NEW: ", newUserInfo)}
                {console.log("OLD: ", userInfo)}
                {newUserInfo !== userInfo
                    ? (
                        <div className='save-changes'>
                            <button>Save Changes</button>
                        </div>
                    )
                    : null}


            </div>

        </div>
    )
}

export default Uprofile
import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faGear, faCaretDown, faXmark, faPlus } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import uuid from 'react-uuid'
import "../../css/loggedin/uprofile.css"
import apiService from '../../../features/apis/apiService'

// Shows the martial arts of the user. 
const showInfo = (mart, id) => {
    return (<h4 key={id}>● {mart}</h4>)
}

// Show Editable Mart.
const editMart = (mart, id, delMart) => {
    return (
        <div key={id} className='edit-info'>
            <h4 >● {mart}</h4>
            <FontAwesomeIcon icon={faXmark} className="u-delete-font" onClick={() => { delMart(mart) }} />
        </div>
    )
}
// Show Editable Art
const editArt = (award, id, delAward) => {
    return (
        <div key={id} className='edit-info'>
            <h4 >● {award}</h4>
            <FontAwesomeIcon icon={faXmark} className="u-delete-font" onClick={() => { delAward(award) }} />
        </div>
    )
}

function Uprofile({ user }) {
    // true if user is editing profile.
    const [isEditingInfo, setIsEditingInfo] = useState(false)

    // gets the user's information by requesting a GET request to the backend.
    const getUserInfo = async () => {
        console.log("USER TOKEN: ", user);
        const response = await apiService.getUserInfo(user);
        console.log(response.data);
        setUserInfo(response.data);
        setNewUserInfo(response.data);

    }

    const [newInfo, setNewInfo] = useState({
        addMart: "",
        addAward: ""
    })

    const { addMart, addAward } = newInfo

    // Used when the dom is first loaded. will only display userInfo once the
    // user's information from the backend is received and set.
    const [displayInfo, setDisplayInfo] = useState(false)

    // Initial values for userInfo and setUserInfo.
    const [userInfo, setUserInfo] = useState({
        name: "updated name",
        bio: "",
        location: {},
        lfspar: false,
        lfSparArts: {},
        lfcoach: false,
        lfcoachArts: {},
        marts: { "karate": true, "sambo": true },
        awards: ["champion in muay thai", "black belt in taekwando"]
    })

    // has the initial value of userInfo. information here will be displayed in the
    // user's profile. 
    const [newUserInfo, setNewUserInfo] = useState(userInfo)

    const { name, bio, lfSparArts, lfcoachArts, marts, awards } = newUserInfo


    const [showSave, setShowSave] = useState(false)
    // Calls the getUserInfo function to get and set the user's information. also sets the 
    // setDisplayInfo to true so the profile will display the information.
    useEffect(() => {
        console.log("IN USE EFFECT");
        const setProfileData = async () => {
            await getUserInfo();
            setDisplayInfo(true)
        }
        setProfileData()
    }, [displayInfo])


    const handleNewInfo = ((e) => {
        setNewInfo((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    })

    const changeUserData = async () => {
        console.log("SENDING: ", newUserInfo);
        const response = await apiService.updateUserInfo(user, newUserInfo);
        console.log("RESPONSE IN UPROFILE: ", response);
        setIsEditingInfo(false)
        setShowSave(false)

    }


    // Deletes a martial art in newUserInfo
    const delMart = (mart) => {
        console.log(`del ${mart} called`);
        setNewUserInfo((prevState) => {
            const newState = { ...prevState };
            delete newState.marts[`${mart}`]
            return newState
        })

    }
    // Deletes an award in newUserInfo
    const delAward = (award) => {
        console.log(`del ${award} called`);
        setNewUserInfo((prevState) => {
            const newState = { ...prevState };
            newState.awards = newState.awards.filter((item) => item !== award);
            return newState
        })
    }

    const addNewInfo = (info, type = null) => {
        console.log("INFO: ", info);
        if (type) {
            console.log("IN FIRST");
            setNewUserInfo((prevState) => {
                const newState = { ...prevState };
                newState.marts = {
                    ...newState.marts,
                    [info]: true
                }
                return newState
            })
        } else {
            console.log("IN SCND");
            const newAwards = { ...newUserInfo }
            newAwards.awards.push(info)
            setNewUserInfo(newAwards)
        }
    }

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
                <FontAwesomeIcon icon={faGear} className="u-setting-icon" />

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
                <FontAwesomeIcon icon={faGear} className="p-setting-icon" onClick={() => { setIsEditingInfo(!isEditingInfo); setShowSave(!showSave) }} />
                <div className='u-profile-marts'>
                    <h4>Martial Arts:</h4>
                    <div className='u-profile-grp'>
                        <div className='profile-marts-box'>

                            {!isEditingInfo
                                ? Object.keys(marts).map((mart, val) => {
                                    const id = uuid()
                                    return showInfo(mart, id)
                                })
                                : Object.keys(marts).map((mart, val) => {
                                    const id = uuid()
                                    return editMart(mart, id, delMart)
                                })
                            }

                            {isEditingInfo &&
                                <div className='add-info'>
                                    <input type="text" value={addMart} name="addMart" onChange={handleNewInfo} />
                                    <FontAwesomeIcon icon={faPlus} className="add-info-icon" onClick={() => { addNewInfo(addMart, 1) }} />
                                </div>}

                        </div>
                    </div>
                </div>

                <p>People can see your martial arts when they check your profile.</p>
                <span />

                <div className='u-profile-marts'>
                    <h4>Achievements:</h4>
                    <div className='u-profile-grp'>
                        <div className='profile-marts-box'>
                            {!isEditingInfo
                                ? awards.map((award, val) => {
                                    const id = uuid()
                                    return showInfo(award, id, delMart)
                                })
                                : awards.map((award, val) => {
                                    const id = uuid()
                                    return editArt(award, id, delAward)
                                })}
                            {isEditingInfo &&
                                <div className='add-info'>
                                    <input type="text" value={addAward} name="addAward" onChange={handleNewInfo} />
                                    <FontAwesomeIcon icon={faPlus} className="add-info-icon" onClick={() => { addNewInfo(addAward) }} />
                                </div>}
                        </div>
                    </div>
                </div>

                <p>People can see your martial arts when they check your profile.</p>
                <span />
                <div className='u-profile-marts'>
                    <h4>Your Area:</h4>
                    <div className='u-profile-grp'>
                        <h4 className='user-loc'>Cainta Greenpark, Cainta Rizal</h4>
                    </div>
                </div>
                <p>Help people near you connect with you. Pin your area on the maps to set. </p>
                <span />

                <div className='u-profile-marts'>
                    <h4>Account Status:</h4>
                    <div className="u-status">
                        <div className="user-coach what-status what-status-active">
                            <span></span>
                            <div className="status-txt"><h4>Coach</h4></div>
                        </div>
                        <div className="user-stud what-status">
                            <span></span>
                            <div className="status-txt"><h4>student</h4></div>
                        </div>
                    </div>
                </div>

                <p>Are you a coach or a student?</p>
                <span />
                {showSave
                    ? (
                        <div className='save-changes'>
                            <button onClick={changeUserData}>Save Changes</button>
                        </div>
                    )
                    : null}


            </div>

        </div>
    )
}

export default Uprofile
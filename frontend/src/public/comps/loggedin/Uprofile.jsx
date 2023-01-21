import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faGear, faCaretDown, faXmark, faPlus } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import uuid from 'react-uuid'
import "../../css/loggedin/uprofile.css"
import userProfileScript from '../../scripts/userProfileScript'
import apiService from '../../../features/apis/apiService'
import UprofileMarts from './UprofileMarts';
import UprofileAwards from './UprofileAwards';
import UprofileStatus from './UprofileStatus';
import UprofileFinding from './UprofileFinding'



function Uprofile({ user }) {

    useEffect(() => {
        console.log("CALLING USER PROFILE SCRIPT");
        userProfileScript()
    })

    // true if user is editing profile.
    const [isEditingInfo, setIsEditingInfo] = useState(false)

    // gets the user's information by requesting a GET request to the backend.
    const getUserInfo = async () => {
        console.log("USER TOKEN: ", user);
        const response = await apiService.getUserInfo(user);
        console.log(response.data);
        setNewUserInfo(response.data);

    }
    // Used for adding martial arts and awards/Achievements
    const [newInfo, setNewInfo] = useState({
        addMart: "",
        addAward: ""
    })

    const { addMart, addAward } = newInfo

    // Used when the dom is first loaded. will only display userInfo once the
    // user's information from the backend is received and set.
    const [displayInfo, setDisplayInfo] = useState(false)



    // has the initial value of userInfo. information here will be displayed in the
    // user's profile. 
    const [newUserInfo, setNewUserInfo] = useState({
        name: "updated name",
        bio: "",
        coach: true,
        location: {},
        lfspar: false,
        lfSparArts: {},
        lfcoach: false,
        lfcoachArts: {},
        marts: { "karate": true, "sambo": true },
        awards: ["champion in muay thai", "black belt in taekwando"]
    })

    const { name, bio, coach, lfSparArts, lfcoachArts, marts, awards } = newUserInfo


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

    const changeUserStatus = (makeCoach = null) => {
        console.log("change user clicked");
        if (isEditingInfo) {
            console.log("user status will be editted");
            if (makeCoach || coach === false) {
                console.log("user status changing to coach");
                setNewUserInfo((prevState) => {
                    const newState = { ...prevState, coach: true };
                    return newState
                })
            }
            else if (!makeCoach || coach === true) {
                console.log("user status changing to student");

                setNewUserInfo((prevState) => {
                    const newState = { ...prevState, coach: false }
                    return newState
                })
            }
        }
    }

    return (
        <div id='u-profile-page' className='u-profile-page'>
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

            <UprofileFinding lfSparArts={lfSparArts ? lfSparArts : {}} lfcoachArts={lfcoachArts ? lfcoachArts : {}} setNewUserInfo={setNewUserInfo} />

            <div className="u-profile-contents">
                <FontAwesomeIcon icon={faGear} className="p-setting-icon" onClick={() => { setIsEditingInfo(!isEditingInfo); setShowSave(!showSave) }} />

                <UprofileMarts isEditingInfo={isEditingInfo} marts={marts} addMart={addMart} delMart={delMart} handleNewInfo={handleNewInfo} addNewInfo={addNewInfo} />

                <p>People can see your martial arts when they check your profile.</p>
                <span />

                <UprofileAwards isEditingInfo={isEditingInfo} awards={awards} delMart={delMart} delAward={delAward} addAward={addAward} handleNewInfo={handleNewInfo} addNewInfo={addNewInfo} />
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

                <UprofileStatus coach={coach} changeUserStatus={changeUserStatus} />

                <p>Are you a coach or a student?</p>
                <span />
                <div className='save-changes'>

                    {showSave
                        ? (
                            <button onClick={changeUserData}>Save Changes</button>
                        )
                        : null}
                </div>



            </div>

        </div>
    )
}

export default Uprofile
import React, { useEffect, Suspense } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faGear, faCaretDown, faXmark, faPlus } from '@fortawesome/free-solid-svg-icons'
import { useState, useRef } from 'react'
import uuid from 'react-uuid'
import "../../css/loggedin/uprofile.css"
import apiService from '../../../features/apis/apiService'


import UprofileBox from "./UprofileBox";
import UprofileStatus from './UprofileStatus';
import UprofileFinding from './UprofileFinding'
import UprofileContents from './UprofileContents'


function Uprofile({ user }) {



    // true if user is editing profile.
    const [isEditingInfo, setIsEditingInfo] = useState(false)
    // Used for adding martial arts and awards/Achievements
    const [newInfo, setNewInfo] = useState({
        addMart: "",
        addAward: ""
    })
    const { addMart, addAward } = newInfo
    // Used when the dom is first loaded. will only display userInfo once the
    // user's information from the backend is received and set.
    const [displayInfo, setDisplayInfo] = useState(false)
    // gets the user's information by requesting a GET request to the backend.
    const getUserInfo = async () => {
        console.log("USER TOKEN: ", user);
        console.log("GETTING USER INFO");
        const response = await apiService.getUserInfo(user);
        setNewUserInfo({ ...response.data, lfDataChanged: 0 });
        // had to stringiny then parse so the two states will not have the same reference.
        setDbUserInfo(JSON.parse(JSON.stringify(response.data)));
    }


    // has the initial value of userInfo. information here will be displayed in the
    // user's profile. 


    const [dbUserInfo, setDbUserInfo] = useState(null)



    const [newUserInfo, setNewUserInfo] = useState({
        name: "",
        bio: "",
        coach: true,
        location: {},
        lfSpar: false,
        lfSparArts: {},
        lfCoach: false,
        lfCoachArts: {},
        marts: {},
        awards: [],
    })

    const { name, bio, coach, lfSparArts, lfCoachArts, marts, awards } = newUserInfo
    const [showSave, setShowSave] = useState(false)

    const [lfDataChanged, setLfDataChanged] = useState(0)



    // Calls the getUserInfo function to get and set the user's information. also sets the 
    // setDisplayInfo to true so the profile will display the information.
    useEffect(() => {
        console.log("IN USE EFFECT");
        const setProfileData = async () => {
            await getUserInfo();
            setDisplayInfo(true)
        }
        setProfileData()
    }, [])


    useEffect(() => {
        console.log("USER INFO: ", newUserInfo);
        console.log("DB INFO: ", dbUserInfo);
    }, [newUserInfo])

    // FUNCTIONS FOR UprofileFinding // FUNCTIONS FOR UprofileFinding // FUNCTIONS FOR UprofileFinding // FUNCTIONS FOR UprofileFinding
    const updateLfSpartner = (mart) => {
        if (Object.keys(lfSparArts).includes(mart)) {
            // remove
            setNewUserInfo((prevState) => {
                console.log("UPDATING LF DATA");
                setLfDataChanged(prevState => prevState + 1);
                console.log(lfDataChanged);
                const newState = { ...prevState }
                delete newState.lfSparArts[mart]
                console.log("NEWSTATE: ", newState);
                return newState
            })
            changeUserData()
        } else {
            console.log("MART NOT IN ARTS");
            setNewUserInfo((prevState) => {
                const newState = { ...prevState };
                console.log("SETTING LF DATA");
                setLfDataChanged(prevState => prevState + 1);
                newState.lfSparArts[mart] = true
                console.log("NEWSTATE: ", newState);
                return newState
            })
            changeUserData()
        }
        // add
    }

    const updateLfCoach = (mart) => {
        if (Object.keys(lfCoachArts).includes(mart)) {
            // remove
            console.log("MART ALREADY IN ARTS");
            setNewUserInfo((prevState) => {
                const newState = { ...prevState }
                setLfDataChanged(prevState => prevState + 1);
                delete newState.lfCoachArts[mart]
                console.log("NEWSTATE: ", newState);
                return newState
            })
            changeUserData()
        } else {
            console.log("MART NOT IN ARTS");
            setNewUserInfo((prevState) => {
                const newState = { ...prevState };
                setLfDataChanged(prevState => prevState + 1);
                newState.lfCoachArts[mart] = true
                console.log("NEWSTATE: ", newState);
                return newState
            })
            changeUserData()
        }
        // add
    }
    //****************************************************************************************************************************** */


    const handleNewInfo = ((e) => {
        setNewInfo((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    })

    const changeUserData = async () => {
        console.log("SENDING: ", newUserInfo);
        const response = await apiService.updateUserInfo(user, newUserInfo);
        if (isEditingInfo) { setIsEditingInfo(false) }
        { showSave && setShowSave(false) }
        console.log("RESPONSE IN UPROFILE: ", response);
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

    const changeUserStatus = (makeCoach) => {
        console.log("change user clicked");
        if (isEditingInfo) {
            console.log("user status will be editted");
            if (makeCoach === 1 && coach === false) {
                console.log("user status changing to coach");
                setNewUserInfo((prevState) => {
                    const newState = { ...prevState, coach: true };
                    return newState
                })
            }
            else if (makeCoach !== 1 && coach === true) {
                console.log("user status changing to student");

                setNewUserInfo((prevState) => {
                    const newState = { ...prevState, coach: false }
                    return newState
                })
            }
        }
    }

    const handleEditProfile = () => {
        if (!isEditingInfo) {
            console.log(" IN IF");
            setIsEditingInfo(!isEditingInfo)
            setShowSave(!showSave)
        } else {
            setIsEditingInfo(!isEditingInfo)
            setShowSave(!showSave)
            console.log("SETTING NEW USER INFO TO DBUSERINFO");
            setNewUserInfo(JSON.parse(JSON.stringify({ ...dbUserInfo })))
        }
    }

    useEffect(() => {
        console.log("showSave CHANGED IN UPROFILE: ", showSave);
    }, [showSave])

    return (
        <div id='u-profile-page' className='u-profile-page'>
            <UprofileBox name={name} bio={bio} faGear={faGear} />
            <UprofileFinding lfSparArts={lfSparArts} lfCoachArts={lfCoachArts} lfDataChanged={lfDataChanged}
                updateLfSpartner={updateLfSpartner} updateLfCoach={updateLfCoach} />
            <UprofileContents
                isEditingInfo={isEditingInfo} handleEditProfile={handleEditProfile} showSave={showSave}
                marts={marts} awards={awards} addMart={addMart} delMart={delMart} delAward={delAward} addAward={addAward}
                handleNewInfo={handleNewInfo} addNewInfo={addNewInfo} UprofileStatus={UprofileStatus} coach={coach}
                changeUserStatus={changeUserStatus} changeUserData={changeUserData} />
        </div>

    )
}



export default Uprofile
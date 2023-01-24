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
        const response = await apiService.getUserInfo(user);
        console.log(response.data);
        const DbData = response.data
        setNewUserInfo({ ...response.data, changeData: 0 });
        setDbUserInfo({ ...DbData, changeData: 0 });

    }
    // has the initial value of userInfo. information here will be displayed in the
    // user's profile. 


    const [DbUserInfo, setDbUserInfo] = useState(null)
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
        changeData: 0
    })

    const { name, bio, coach, lfSparArts, lfCoachArts, marts, awards, changeData } = newUserInfo
    const [showSave, setShowSave] = useState(false)

    const [updatedLfData, setUpdatedLfData] = useState(null)



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
        if (updatedLfData === null) { return }
        console.log("IN UPDATED USEEFFECT");
        console.log("UPDATED DATA: ", updatedLfData);
        changeUserData(updatedLfData)
    }, [updatedLfData])

    useEffect(() => {
        console.log("USER INFO: ", newUserInfo);
        console.log("DB INFO: ", DbUserInfo);
    }, [newUserInfo])

    // FUNCTIONS FOR UprofileFinding // FUNCTIONS FOR UprofileFinding // FUNCTIONS FOR UprofileFinding // FUNCTIONS FOR UprofileFinding
    const updateLfSpartner = (mart) => {
        if (Object.keys(lfSparArts).includes(mart)) {
            // remove
            setNewUserInfo((prevState) => {
                const newState = { ...prevState, changeData: prevState.changeData + 1 }
                delete newState.lfSparArts[mart]
                setUpdatedLfData(newState)
                console.log("NEWSTATE: ", newState);
                return newState
            })
        } else {
            console.log("MART NOT IN ARTS");
            setNewUserInfo((prevState) => {
                const newState = { ...prevState, changeData: prevState.changeData + 1 };
                newState.lfSparArts[mart] = true
                console.log("NEWSTATE: ", newState);
                setUpdatedLfData(newState)
                return newState
            })
        }
        // add
    }

    const updateLfCoach = (mart) => {
        if (Object.keys(lfCoachArts).includes(mart)) {
            // remove
            console.log("MART ALREADY IN ARTS");
            setNewUserInfo((prevState) => {
                const newState = { ...prevState, changeData: prevState.changeData + 1 }
                delete newState.lfCoachArts[mart]
                setUpdatedLfData(newState)
                console.log("NEWSTATE: ", newState);
                return newState
            })
        } else {
            console.log("MART NOT IN ARTS");
            setNewUserInfo((prevState) => {
                const newState = { ...prevState, changeData: prevState.changeData + 1 };
                newState.lfCoachArts[mart] = true
                console.log("NEWSTATE: ", newState);
                setUpdatedLfData(newState)
                return newState
            })
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

    const changeUserData = async (newInfo) => {
        console.log("SENDING: ", newInfo);
        const response = await apiService.updateUserInfo(user, newInfo);
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

    useEffect(() => {
        if (!isEditingInfo && DbUserInfo !== null) {
            console.log("UPDATING NEW USER INFO");
            setNewUserInfo(DbUserInfo)
        }
    }, [isEditingInfo])


    return (
        <div id='u-profile-page' className='u-profile-page'>
            <UprofileBox name={name} bio={bio} faGear={faGear} />
            <UprofileFinding lfSparArts={lfSparArts} lfCoachArts={lfCoachArts} changeData={changeData}
                updateLfSpartner={updateLfSpartner} updateLfCoach={updateLfCoach} />
            <UprofileContents
                isEditingInfo={isEditingInfo} setIsEditingInfo={setIsEditingInfo} showSave={showSave} setShowSave={setShowSave}
                marts={marts} awards={awards} addMart={addMart} delMart={delMart} delAward={delAward} addAward={addAward}
                handleNewInfo={handleNewInfo} addNewInfo={addNewInfo} UprofileStatus={UprofileStatus} coach={coach}
                changeUserStatus={changeUserStatus} changeUserData={changeUserData} changeData={changeData} />
        </div>

    )
}



export default Uprofile
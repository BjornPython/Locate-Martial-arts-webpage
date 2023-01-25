import React, { useEffect, useMemo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faGear, faCaretDown, faXmark, faPlus } from '@fortawesome/free-solid-svg-icons'
import { useState, useRef } from 'react'
import uuid from 'react-uuid'
import "../../../css/loggedin/uprofile.css"
import apiService from '../../../../features/apis/apiService'


import UprofileBox from "./UprofileBox"
import UprofileStatus from './UprofileStatus';
import UprofileFinding from './UprofileFinding'
import UprofileContents from './UprofileContents'


function Uprofile({ user, info }) {


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
        if (info === null) {
            return

        } else {
            setNewUserInfo({ ...info });
            // had to stringiny then parse so the two states will not have the same reference.
            setDbUserInfo(JSON.parse(JSON.stringify(info)));
        }

    }, [info])



    // FUNCTIONS FOR UprofileFinding // FUNCTIONS FOR UprofileFinding // FUNCTIONS FOR UprofileFinding // FUNCTIONS FOR UprofileFinding
    const updateLfSpartner = (mart) => {
        if (Object.keys(lfSparArts).includes(mart)) {
            // remove
            setNewUserInfo((prevState) => {
                setLfDataChanged(prevState => prevState + 1);
                console.log(lfDataChanged);
                const newState = { ...prevState }
                delete newState.lfSparArts[mart]
                return newState
            })
            changeUserData()
        } else {
            setNewUserInfo((prevState) => {
                const newState = { ...prevState };
                setLfDataChanged(prevState => prevState + 1);
                newState.lfSparArts[mart] = true
                return newState
            })
            changeUserData()
        }
        // add
    }

    const updateLfCoach = (mart) => {
        if (Object.keys(lfCoachArts).includes(mart)) {
            // remove
            setNewUserInfo((prevState) => {
                const newState = { ...prevState }
                setLfDataChanged(prevState => prevState + 1);
                delete newState.lfCoachArts[mart]
                return newState
            })
            changeUserData()
        } else {
            setNewUserInfo((prevState) => {
                const newState = { ...prevState };
                setLfDataChanged(prevState => prevState + 1);
                newState.lfCoachArts[mart] = true
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
        const response = await apiService.updateUserInfo(user, newUserInfo);
        if (isEditingInfo) { setIsEditingInfo(false) }
        { showSave && setShowSave(false) }
    }


    // Deletes a martial art in newUserInfo
    const delMart = (mart) => {
        setNewUserInfo((prevState) => {
            const newState = { ...prevState };
            delete newState.marts[`${mart}`]
            return newState
        })

    }
    // Deletes an award in newUserInfo
    const delAward = (award) => {
        setNewUserInfo((prevState) => {
            const newState = { ...prevState };
            newState.awards = newState.awards.filter((item) => item !== award);
            return newState
        })
    }

    const addNewInfo = (info, type = null) => {
        if (type) {
            setNewUserInfo((prevState) => {
                const newState = { ...prevState };
                newState.marts = {
                    ...newState.marts,
                    [info]: true
                }
                return newState
            })
        } else {
            const newAwards = { ...newUserInfo }
            newAwards.awards.push(info)
            setNewUserInfo(newAwards)
        }
    }

    const changeUserStatus = (makeCoach) => {
        if (isEditingInfo) {
            if (makeCoach === 1 && coach === false) {
                setNewUserInfo((prevState) => {
                    const newState = { ...prevState, coach: true };
                    return newState
                })
            }
            else if (makeCoach !== 1 && coach === true) {
                setNewUserInfo((prevState) => {
                    const newState = { ...prevState, coach: false }
                    return newState
                })
            }
        }
    }

    const handleEditProfile = () => {
        if (!isEditingInfo) {
            setIsEditingInfo(!isEditingInfo)
            setShowSave(!showSave)
        } else {
            setIsEditingInfo(!isEditingInfo)
            setShowSave(!showSave)
            setNewUserInfo(JSON.parse(JSON.stringify({ ...dbUserInfo })))
        }
    }

    useEffect(() => {
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
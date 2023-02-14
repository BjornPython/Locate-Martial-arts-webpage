import React, { useState } from 'react'
import "../../css/loggedin/uprofile.css"
import GprofileBox from './GprofileBox'
import GprofileContents from './GprofileContents'
import { useEffect } from 'react'
function Gprofile({ gymInfo }) {

    // Used for adding martial arts and awards/Achievements
    const [newInfo, setNewInfo] = useState({
        addMart: "",
        addAward: ""
    })
    const { addMart, addAward } = newInfo
    const [isEditingInfo, setIsEditingInfo] = useState(false)
    const [showSave, setShowSave] = useState(false)
    const [dbGymInfo, setDbGymInfo] = useState(gymInfo)
    const [profileGymInfo, setProfileGymInfo] = useState(gymInfo)
    const { name, bio, marts } = profileGymInfo

    useEffect(() => {
        setProfileGymInfo(gymInfo)
        setDbGymInfo(JSON.parse(JSON.stringify({ ...gymInfo })))
    }, [gymInfo])

    const handleEditProfile = () => {
        if (!isEditingInfo) {
            setIsEditingInfo(!isEditingInfo)
            setShowSave(!showSave)
        } else {
            setIsEditingInfo(!isEditingInfo)
            setShowSave(!showSave)
            setProfileGymInfo(JSON.parse(JSON.stringify({ ...dbGymInfo })))
        }
    }

    const delMart = (mart) => {
        setProfileGymInfo(prevState => {
            const newState = { ...prevState }
            delete newState.marts[mart]
            return newState
        })
    }

    const handleNewInfo = ((e) => {
        setNewInfo((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    })

    const addNewInfo = (info, type = null) => {
        if (type) {
            setProfileGymInfo((prevState) => {
                const newState = { ...prevState };
                newState.marts = {
                    ...newState.marts,
                    [info]: true
                }
                return newState
            })
        } else {
            setProfileGymInfo(prevState => {
                const newState = {
                    ...prevState,
                    awards: [...prevState.awards, info]
                }
                return newState
            })

        }
    }

    return (
        <div id='u-profile-page' className='u-profile-page'>
            <GprofileBox name={name} bio={bio} />
            <GprofileContents handleEditProfile={handleEditProfile} isEditingInfo={isEditingInfo} marts={marts} delMart={delMart}
                handleNewInfo={handleNewInfo} addMart={addMart} addNewInfo={addNewInfo} />

        </div>
    )
}

export default Gprofile
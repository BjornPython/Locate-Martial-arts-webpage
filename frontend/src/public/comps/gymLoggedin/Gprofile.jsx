import React, { useState } from 'react'
import "../../css/loggedin/uprofile.css"
import GprofileBox from './GprofileBox'
import GprofileContents from './GprofileContents'
import { useEffect } from 'react'
function Gprofile({ gymInfo }) {

    const [isEditingInfo, setIsEditingInfo] = useState(false)
    const [showSave, setShowSave] = useState(false)
    const [dbGymInfo, setDbGymInfo] = useState(gymInfo)
    const [profileGymInfo, setProfileGymInfo] = useState(gymInfo)
    const { name, bio } = profileGymInfo

    useEffect(() => {
        setProfileGymInfo(gymInfo)
        setDbGymInfo(gymInfo)
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


    return (
        <div id='u-profile-page' className='u-profile-page'>
            <GprofileBox name={name} bio={bio} />
            <GprofileContents />

        </div>
    )
}

export default Gprofile
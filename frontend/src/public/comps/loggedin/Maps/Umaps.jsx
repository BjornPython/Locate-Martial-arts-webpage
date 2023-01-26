import React from 'react'
import UmapForms from './UmapForms'
import UmapBox from './UmapBox'
import "../../../css/loggedin/Umaps/umap.css"
import { useState, useEffect } from 'react'
import apiService from '../../../../features/apis/apiService';

function Umaps({ user, info, getUserInfo }) {

    const [userInfo, setUserInfo] = useState({
        lat: 12.8797,
        long: 121.7740,

    })
    const { lat, long } = userInfo

    const [newUserLocation, setNewUserLocation] = useState(null)

    useEffect(() => {
        if (newUserLocation === null) { return }
        updateUserLocation(newUserLocation)
    }, [newUserLocation])

    useEffect(() => {
        if (!info) { return }
        else {
            setUserInfo({ lat: info.location.lat, long: info.location.long })
        }
    }, [info])

    const updateUserLocation = async () => {
        const response = await apiService.updateUserInfo(user, newUserLocation)
        getUserInfo()
        return response
    }

    const updateNewUserLocation = () => {
        setNewUserLocation({ location: { lat, long } })
    }

    return (
        <div className='u-maps-page'>
            <UmapForms />
            <UmapBox lat={lat} long={long} updateNewUserLocation={updateNewUserLocation} setUserInfo={setUserInfo} />
        </div>
    )
}

export default Umaps
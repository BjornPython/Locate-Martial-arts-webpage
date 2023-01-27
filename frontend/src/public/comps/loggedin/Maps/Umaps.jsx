import React from 'react'
import UmapForms from './UmapForms'
import UmapBox from './UmapBox'
import "../../../css/loggedin/Umaps/umap.css"
import { useState, useEffect } from 'react'
import apiService from '../../../../features/apis/apiService';

function Umaps({ user, info, getUserInfo }) {

    const [userInfo, setUserInfo] = useState({
        lat: 12.8797,
        long: 121.7740

    })
    const { lat, long } = userInfo

    const [newUserLocation, setNewUserLocation] = useState(null)


    const [markerPoints, setMarkerPoints] = useState({ gyms: [], coaches: [], spartners: [] })

    const [selectedLfs, setSelectedLfs] = useState([])

    const [lookingForMarts, setLookingForMarts] = useState([])

    useEffect(() => {
        console.log("NEW LOOKING FOR MARTS: ", lookingForMarts);
    }, [lookingForMarts])



    useEffect(() => {
        console.log("SELECTED LFS: ", selectedLfs);
    }, [selectedLfs])

    useEffect(() => {
        if (newUserLocation === null) { return }
        updateUserDbLoc(newUserLocation)
    }, [newUserLocation])

    useEffect(() => {
        if (!info) { return }
        else {
            setUserInfo({ lat: info.location.lat, long: info.location.long })
        }
    }, [info])

    const updateUserDbLoc = async () => {
        const response = await apiService.updateUserInfo(user, newUserLocation)
        return response
    }

    const updateUserInfo = (lat, long) => {
        setUserInfo({ lat, long })
    }

    const updateNewUserLocation = () => {
        setNewUserLocation({ location: { lat, long } })
    }

    const updateMarkerPoints = () => {

    }

    const toggleLf = (lf) => {
        setSelectedLfs((prevState) => {
            if (prevState.includes(lf)) {
                const newValue = prevState.filter(item => item !== lf)
                return newValue
            } else {
                return [...prevState, lf]
            }
        })
    }

    const toggleLookingForMart = (mart) => {
        setLookingForMarts((prevState) => {
            if (prevState.includes(mart)) {
                const newState = prevState.filter(value => value !== mart)
                return newState
            } else {
                const newState = [...prevState, mart]
                return newState
            }
        })
    }

    const getMarkerLocations = async () => {
        console.log("GETTING MARKER LOCATIONS");
        const location = newUserLocation ? newUserLocation : { lat, long }
        if (selectedLfs.includes("GYM")) {
            const res = await apiService.findGyms(location, JSON.stringify(lookingForMarts))
            console.log("RESPONSE: ", res);
            setMarkerPoints((prevState) => {
                const newState = { ...prevState, gyms: res.data }
                return newState
            })
        }

        if (selectedLfs.includes("COACH")) {

        }

        if (selectedLfs.includes("SPARTNER")) {

        }
    }

    return (
        <div className='u-maps-page'>
            <UmapForms updateUserInfo={updateUserInfo} selectedLfs={selectedLfs} toggleLf={toggleLf} toggleLookingForMart={toggleLookingForMart}
                getMarkerLocations={getMarkerLocations} />
            <UmapBox lat={lat} long={long} updateNewUserLocation={updateNewUserLocation} updateUserInfo={updateUserInfo} markerPoints={markerPoints} />
        </div>
    )
}

export default Umaps
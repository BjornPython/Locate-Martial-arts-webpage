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
        id: null

    })
    const { lat, long, id } = userInfo

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
            console.log("INFO: ", info);
            const newLocation = info.location.lat && info.location.long
                ? { lat: info.location.lat, long: info.location.long, id: info._id }
                : { lat: 12.8797, long: 121.7740, id: info._id }
            setUserInfo(newLocation)
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
        console.log("SENDING LOCATION: ", location);
        if (selectedLfs.includes("GYM")) {
            const res = await apiService.findGyms(location, JSON.stringify(lookingForMarts))
            setMarkerPoints((prevState) => {
                const newState = { ...prevState, gyms: res.data.filter(item => item._id !== id) }
                return newState
            })
        } if (!selectedLfs.includes("GYM")) { setMarkerPoints((prevState) => { return { ...prevState, gyms: [] } }) }


        if (selectedLfs.includes("COACH")) {
            const res = await apiService.findCoach(location, JSON.stringify(lookingForMarts))
            setMarkerPoints((prevState) => {
                const newState = { ...prevState, coaches: res.data.filter(item => item._id !== id) }
                return newState
            })
        } if (!selectedLfs.includes("COACH")) { setMarkerPoints((prevState) => { return { ...prevState, coaches: [] } }) }

        if (selectedLfs.includes("SPARTNER")) {
            const res = await apiService.findSparringPartners(location, JSON.stringify(lookingForMarts))

            setMarkerPoints((prevState) => {
                const newState = { ...prevState, spartners: res.data.filter(item => item._id !== id) }
                return newState
            })
        } if (!selectedLfs.includes("SPARTNER")) { setMarkerPoints((prevState) => { return { ...prevState, spartners: [] } }) }
    }

    return (
        <div className='u-maps-page'>
            <UmapForms updateUserInfo={updateUserInfo} selectedLfs={selectedLfs} toggleLf={toggleLf} lookingForMarts={lookingForMarts} toggleLookingForMart={toggleLookingForMart}
                getMarkerLocations={getMarkerLocations} />
            <UmapBox lat={lat} long={long} updateNewUserLocation={updateNewUserLocation} updateUserInfo={updateUserInfo} markerPoints={markerPoints} />
        </div>
    )
}

export default Umaps
import React, { useEffect } from 'react'
import { Marker, Popup } from 'react-leaflet'
import L from "leaflet"
import { useState } from 'react'

import apiService from "../../features/apis/apiService"
import { set } from 'mongoose'


const markerIcon = L.icon({
    iconUrl: require("../images/punching-bag.png"),
    iconRetinaUrl: require("../images/punching-bag.png"),
    iconSize: [42, 42]

})


const MyMarkers = ({ data }) => {
    if (!data) { return }
    return data.map(({ lat, lng, title }, index) => (
        <Marker
            key={index}
            position={{ lat, lng }}
            icon={markerIcon}
        >
            <Popup>{title}</Popup>
        </Marker>
    ));
}


function GetGyms({ points }) {

    const [pinPoints, setPinPoints] = useState(null)

    useEffect(() => {
        if (!points) { return }
        const getSetData = async () => {
            try {
                const response = await apiService.findGyms();
                const addressPoints = response.data.map((gym) => {
                    return { lat: gym.location.lat, lng: gym.location.long, title: gym.location.name }
                })
                console.log(addressPoints);
                setPinPoints(addressPoints)
            } catch (err) {
                console.error(err)
            }
        };

        getSetData()
    }, [points])

    useEffect(() => {
        console.log("points has been changed");
        console.log(points);
    }, [points])


    return (
        <div>
            <MyMarkers data={pinPoints} ></MyMarkers>
        </div>
    )
}

export default GetGyms
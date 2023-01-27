import React from 'react'
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';


// Moves the maps center to the location of the marker.
const ChangeMapCenter = ({ lat, long }) => {
    const map = useMap();

    useEffect(() => {
        if (lat && long) {
            console.log("LAT LONG RECEIVED: ", [lat, long]);
            map.setView([lat, long], 18)

        }

    }, [lat, long])
}

const MoveMarkerOnClick = ({ updateUserInfo }) => {
    const map = useMap()

    useEffect(() => {
        map.on("click", (e) => {
            console.log("MAP CLICKED: ", e.latlng);
            updateUserInfo(e.latlng.lat, e.latlng.lng)
        })
    }, [])
}








function HelperComponent({ lat, long, updateUserInfo }) {
    return (
        <>
            <ChangeMapCenter lat={lat} long={long} updateUserInfo={updateUserInfo} />
            <MoveMarkerOnClick updateUserInfo={updateUserInfo} />
        </>
    )
}

export default HelperComponent
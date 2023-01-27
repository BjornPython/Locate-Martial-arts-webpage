import React from 'react'
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';


// Moves the maps center to the location of the marker.
const ChangeMapCenter = ({ lat, long, updateUserInfo }) => {
    const map = useMap();

    useEffect(() => {
        if (lat && long) {
            console.log("LAT LONG RECEIVED: ", [lat, long]);
            map.setView([lat, long], 18)

        }

    }, [lat, long])
}










function HelperComponent({ lat, long, updateUserInfo }) {
    return (
        <>
            <ChangeMapCenter lat={lat} long={long} updateUserInfo={updateUserInfo} />
        </>
    )
}

export default HelperComponent
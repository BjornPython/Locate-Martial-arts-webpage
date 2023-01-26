import React from 'react'
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';


const ChangeMapCenter = ({ lat, long, changeMapCenter }) => {
    const map = useMap();

    useEffect(() => {
        if (lat && long) {
            console.log("LAT LONG RECEIVED: ", [lat, long]);
            map.setView([lat, long], 18)
            changeMapCenter(lat, long)

        } else {
            console.log("NO LAT LONG");
        }

    }, [lat, long])
}










function HelperComponent({ lat, long, changeMapCenter }) {
    return (
        <>
            <ChangeMapCenter lat={lat} long={long} changeMapCenter={changeMapCenter} />
        </>
    )
}

export default HelperComponent
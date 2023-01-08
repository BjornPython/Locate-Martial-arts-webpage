import React from 'react'
import { Marker, Popup } from 'react-leaflet'
import L from "leaflet"


const markerIcon = L.icon({
    iconUrl: require("../images/punching-bag.png"),
    iconRetinaUrl: require("../images/punching-bag.png"),
    iconSize: [42, 42]

})


const MyMarkers = ({ data }) => {
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


function GetGyms() {

    const points = [
        {
            lat: 14.610744,
            lng: 121.114182,
            title: 'point 1'
        },
        {
            lat: 14.6114137,
            lng: 121.1132973,
            title: 'point 2'
        },
        {
            lat: 14.61141377,
            lng: 121.1137157,
            title: 'point 3'
        },
        {
            lat: 14.6111490,
            lng: 121.11409664,
            title: 'point 4'
        },
    ];

    return (
        <div>
            <MyMarkers data={points} ></MyMarkers>
        </div>
    )
}

export default GetGyms
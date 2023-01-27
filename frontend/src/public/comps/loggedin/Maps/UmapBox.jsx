import React, { useEffect, useRef, useMemo } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L, { setOptions } from "leaflet"
import "../../../css/loggedin/Umaps/umapBox.css"
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { useState } from 'react';
import apiService from '../../../../features/apis/apiService';
import HelperComponent from './HelperComponent';


const markerIcon = L.icon({
    iconUrl: require("../../../images/icons/place.png"),
    iconRetinaUrl: require("../../../images/icons/place.png"),
    iconSize: [42, 42]
})



function UmapBox({ lat, long, updateUserInfo, updateNewUserLocation, markerPoints }) {

    const { gyms, coaches, spartners } = markerPoints

    useEffect(() => {
        console.log("NEW GYMS: ", gyms);


    }, [gyms])

    const updateUserLocation = async () => {
        updateNewUserLocation()
    }

    const eventHandlers = useMemo(() => ({
        dragend(e) {
            const latlng = e.target.getLatLng()
            updateUserInfo(latlng.lat, latlng.lng)
        },
    }))

    return (
        <div className='u-map-box'>
            <MapContainer center={[lat, long]} zoom={5} scrollWheelZoom={true} style={{ height: "500px", width: "450px" }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker eventHandlers={eventHandlers} position={[lat, long]} draggable={true} icon={markerIcon}>
                    <Popup>
                        <h4>Your Position</h4> <br />
                        <button onClick={() => { updateUserLocation() }} >Set this as your location</button>
                    </Popup>
                </Marker>
                < HelperComponent lat={lat} long={long} updateUserInfo={updateUserInfo} gyms={gyms} />
            </MapContainer>
        </div>
    )
}

export default UmapBox
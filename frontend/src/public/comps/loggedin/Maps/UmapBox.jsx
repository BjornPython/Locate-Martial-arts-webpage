import React, { useEffect, useRef, useMemo } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from 'react-leaflet';
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



function UmapBox({ userInfo, updateUserInfo, updateNewUserLocation, markerPoints, createConvo }) {

    const { lat, long, id, name } = userInfo


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
                        <div className='user-marker-popup'>
                            <h3>Your Position</h3>
                            <button onClick={() => { updateUserLocation() }} >Set as location</button>
                        </div>
                    </Popup>
                    {/* <Circle
                        center={{ lat, lng: long }}
                        fillColor="blue"
                        radius={10000} /> */}
                </Marker>
                < HelperComponent userInfo={userInfo} updateUserInfo={updateUserInfo} markerPoints={markerPoints}
                    createConvo={createConvo} />
            </MapContainer>

            <button className='recenter-btn'>CLICK</button>
        </div>
    )
}

export default UmapBox
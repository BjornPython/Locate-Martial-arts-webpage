import React, { useEffect, useMemo, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, FeatureGroup, useMap } from 'react-leaflet';
import L from "leaflet"
import "../../../css/loggedin/Umaps/umapBox.css"
import { useState } from 'react';
import HelperComponent from './HelperComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsToDot, faEye } from '@fortawesome/free-solid-svg-icons';

const markerIcon = L.icon({
    iconUrl: require("../../../images/icons/place.png"),
    iconRetinaUrl: require("../../../images/icons/place.png"),
    iconSize: [42, 42]
})



function UmapBox({
    userInfo, updateUserInfo, updateNewUserLocation, markerPoints,
    createConvo }) {
    const { lat, long, name } = userInfo
    const mapRef = useRef(null)

    const [currentBounds, setCurrentBounds] = useState(null)
    const [resetCenterValue, setRecetCenterValue] = useState(null)

    useEffect(() => {
        if (userInfo.initialValues) { return }
        setRecetCenterValue([lat, long])
    }, [name]) // setting centervalue useeffect dependency is on name, so it will not be updated
    // when the lat and long changes.


    useEffect(() => {

        if (!userInfo.initialValues || !mapRef) {
            if (lat === 12.8797 && long === 121.7740) { mapRef.current.setView([lat, long], 5) }
            else { mapRef.current.setView([lat, long], 18) }

        }
    }, [userInfo])

    const updateUserLocation = async () => {
        updateNewUserLocation()
    }



    const eventHandlers = useMemo(() => ({
        dragend(e) {
            const latlng = e.target.getLatLng()
            updateUserInfo(latlng.lat, latlng.lng)
        },
    }), [])

    const resetCenter = () => {
        updateUserInfo(resetCenterValue[0], resetCenterValue[1])
        console.log("setting map view")
        mapRef.current.setView([resetCenterValue[0], resetCenterValue[1]], 18)
    }

    const updateCurrentBounds = (bounds) => {
        setCurrentBounds(bounds)
    }


    const changeZoom = () => {
        console.log("IN CHANGE ZOOM: ", mapRef.current.fitBounds);
        if (currentBounds.isValid()) { mapRef.current.fitBounds(currentBounds) }

    }

    return (
        <div className='u-map-box'>
            <MapContainer ref={mapRef} center={[lat, long]} zoom={18} scrollWheelZoom={true} style={{ height: "500px", width: "450px" }}>
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

                </Marker>
                <FeatureGroup >
                    < HelperComponent userInfo={userInfo} updateUserInfo={updateUserInfo} markerPoints={markerPoints}
                        createConvo={createConvo} updateCurrentBounds={updateCurrentBounds} />
                </FeatureGroup>

            </MapContainer>

            <button className='recenter-btn' onClick={(() => {
                resetCenter(resetCenterValue)
            })}><FontAwesomeIcon icon={faArrowsToDot} className="recenter-icn" /></button>
            <button className='eye-btn' onClick={changeZoom}><FontAwesomeIcon icon={faEye} className="eye-icn" /></button>
        </div>
    )
}

export default UmapBox
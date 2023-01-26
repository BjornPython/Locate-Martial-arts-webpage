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



function UmapBox({ lat, long }) {


    const [mapCenter, setMapCenter] = useState([lat, long])


    const changeMapCenter = (lat, long) => {
        setMapCenter([lat, long])
    }

    const updateUserLocation = async (lat, long) => {
        // const response = apiService.updateUserInfo(user, { location: { lat, long } })
        // console.log("RESPONSE: ", response);
    }

    const eventHandlers = useMemo(() => ({
        dragend(e) {
            const latlng = e.target.getLatLng()
            console.log("LATLNG: ", latlng);
        },
    }))

    return (
        <div className='u-map-box'>
            <MapContainer center={mapCenter} zoom={5} scrollWheelZoom={true} style={{ height: "500px", width: "450px" }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker eventHandlers={eventHandlers} position={mapCenter} draggable={true} icon={markerIcon}>
                    <Popup>
                        <h4>Your Position</h4> <br />
                        <button onClick={() => { updateUserLocation() }} >Set this as your location</button>
                    </Popup>
                </Marker>
                < HelperComponent lat={lat} long={long} changeMapCenter={changeMapCenter} />
            </MapContainer>
        </div>
    )
}

export default UmapBox
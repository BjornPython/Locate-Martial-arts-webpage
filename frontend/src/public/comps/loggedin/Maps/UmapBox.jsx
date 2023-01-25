import React, { useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L, { setOptions } from "leaflet"
import "../../../css/loggedin/Umaps/umapBox.css"
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { useState } from 'react';

const markerIcon = L.icon({
    iconUrl: require("../../../images/icons/place.png"),
    iconRetinaUrl: require("../../../images/icons/place.png"),
    iconSize: [42, 42]
})

const ChangeMapCenter = ({ lat, long }) => {
    const map = useMap();

    // map.flyToBounds([{ lat: lat, lng: long }])
    useEffect(() => {
        if (lat && long) {
            console.log("LAT LONG RECEIVED: ", { lat, lng: long });
            map.setView([lat, long], 18)
        } else {
            console.log("NO LAT LONG");
        }

    }, [lat, long])
}


function UmapBox({ info }) {

    useEffect(() => {
        console.log("INFO RECEIVED IN MAPBOX: ", info);
        if (info === null) { return }
        if (info.location.lat && info.location.long) {
            setUserInfo({ lat: info.location.lat, long: info.location.long })
        }
    }, [info])




    const [userInfo, setUserInfo] = useState({
        lat: 12.8797,
        long: 121.7740,

    })
    const { lat, long } = userInfo


    const [mapCenter, setMapCenter] = useState([lat, long])



    return (
        <div className='u-map-box'>
            <MapContainer center={mapCenter} zoom={5} scrollWheelZoom={true} style={{ height: "500px", width: "450px" }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={mapCenter} draggable={true} icon={markerIcon}>
                    <Popup>
                        <h4>Your Position</h4> <br />
                    </Popup>
                </Marker>
                < ChangeMapCenter lat={lat} long={long} />
            </MapContainer>
        </div>
    )
}

export default UmapBox
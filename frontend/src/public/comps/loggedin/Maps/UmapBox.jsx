import React, { useEffect, useRef, useMemo } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L, { setOptions } from "leaflet"
import "../../../css/loggedin/Umaps/umapBox.css"
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { useState } from 'react';
import apiService from '../../../../features/apis/apiService';
const markerIcon = L.icon({
    iconUrl: require("../../../images/icons/place.png"),
    iconRetinaUrl: require("../../../images/icons/place.png"),
    iconSize: [42, 42]
})

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


function UmapBox({ info }) {

    useEffect(() => {
        console.log("INFO RECEIVED IN MAPBOX: ", info);
        if (info === null) { return }
        if (info.location.lat && info.location.long) {
            setUserInfo({ lat: info.location.lat, long: info.location.long })
        }
    }, [info])

    const userMarker = useRef(null)


    const [userInfo, setUserInfo] = useState({
        lat: 12.8797,
        long: 121.7740,

    })
    const { lat, long } = userInfo


    const [mapCenter, setMapCenter] = useState([lat, long])

    const changeMapCenter = (lat, long) => {
        setMapCenter([lat, long])
    }

    const updateUserLocation = async (lat, long) => {
        // const response = apiService.updateUserInfo(user, { location: { lat, long } })
        // console.log("RESPONSE: ", response);
        console.log(userMarker.current._latlng);
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
                <Marker ref={userMarker} eventHandlers={eventHandlers} position={mapCenter} draggable={true} icon={markerIcon}>
                    <Popup>
                        <h4>Your Position</h4> <br />
                        <button onClick={() => { updateUserLocation() }} >Set this as your location</button>
                    </Popup>
                </Marker>
                < ChangeMapCenter lat={lat} long={long} changeMapCenter={changeMapCenter} />
            </MapContainer>
        </div>
    )
}

export default UmapBox
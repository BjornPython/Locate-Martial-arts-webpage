import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L, { setOptions } from "leaflet"
import "../../../css/loggedin/Umaps/umapBox.css"

const center = [12.8797, 121.7740];
function UmapBox() {
    const markerIcon = L.icon({
        iconUrl: require("../../../images/icons/place.png"),
        iconRetinaUrl: require("../../../images/icons/place.png"),
        iconSize: [42, 42]
    })
    return (
        <div className='u-map-box'>
            <MapContainer center={center} zoom={5} scrollWheelZoom={true} style={{ height: "500px", width: "450px" }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={center} draggable={true} icon={markerIcon}>
                    <Popup>
                        <h4>Your Position</h4> <br />
                    </Popup>
                </Marker>

            </MapContainer>
        </div>
    )
}

export default UmapBox
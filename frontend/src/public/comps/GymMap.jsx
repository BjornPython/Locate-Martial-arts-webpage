import { useEffect, useRef, useState, useMemo } from 'react';
import L from "leaflet"
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { useMap } from 'react-leaflet/hooks'
import { Marker } from "react-leaflet";
import { Popup } from "react-leaflet/Popup";
import "leaflet/dist/leaflet.css";
import "../css/gymMap.css"
import GetGyms from './GetGyms';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsToDot, faEye } from '@fortawesome/free-solid-svg-icons';

// Component for getting the clicked position and setting the marker.
const GetCoordinates = ({ updateLatLong }) => {
    const map = useMap();

    useEffect(() => {
        if (!map) return;
        map.on('click', (e) => {
            map.setView(e.latlng, 18)
            updateLatLong(e.latlng.lat, e.latlng.lng)
        })
    }, [map])
    return null
}


// COmponent where the GymMap is, 
function GymMap({ latLong, updateLatLong, searchInfo }) {
    // a map ref for setting the view of the map.
    const mapRef = useRef()

    // Used for setting the starting position of the center of the 
    // map and the starting position of the marker.
    // Initializing the image and size of the markerIcon.
    const markerIcon = L.icon({
        iconUrl: require("../images/icons/place.png"),
        iconRetinaUrl: require("../images/icons/place.png"),
        iconSize: [42, 42]
    })


    // an event handler of the Marker. gets the latitude and the longitude
    // of the marker when it is dragged, and sets the latLong.
    const eventHandlers = useMemo(() => ({
        dragend(e) {
            const latlng = e.target.getLatLng()
            updateLatLong(parseFloat(latlng.lat), parseFloat(latlng.lng))
        },

    }))

    const recenterMap = () => {
        if (!mapRef) { return }
        console.log([latLong[0], latLong[1]])
        mapRef.current.setView([latLong[0], latLong[1]], 18)
    }
    console.log("LATLONG GMYMAP: ", latLong)
    return (
        <div className="map" >
            <MapContainer ref={mapRef} center={latLong} zoom={18} scrollWheelZoom={true} style={{ height: "500px", width: "450px" }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <Marker eventHandlers={eventHandlers} position={latLong} draggable={true} icon={markerIcon}>
                    <Popup>
                        <h4>Your Position</h4> <br /> <p>lat: {latLong[0]} lng: {latLong[1]}</p>
                    </Popup>
                </Marker>

                <GetGyms searchInfo={searchInfo} />

                <GetCoordinates updateLatLong={updateLatLong} />

            </MapContainer>

            <button className='apphome-recenter-btn' onClick={(() => {
                recenterMap()
            })}><FontAwesomeIcon icon={faArrowsToDot} className="apphome-recenter-icn" /></button>
            <button className='apphome-eye-btn' ><FontAwesomeIcon icon={faEye} className="apphome-recenter-icn" /></button>
        </div>

    )
}


export default GymMap
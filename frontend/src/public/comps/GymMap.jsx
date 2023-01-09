import { useEffect, useRef, useState, useMemo } from 'react';
import L, { setOptions } from "leaflet"
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { useMap } from 'react-leaflet/hooks'
import { Marker, useMapEvent } from "react-leaflet";
import { Popup } from "react-leaflet/Popup";
import "leaflet/dist/leaflet.css";
import "../css/gymMap.css"
import GetGyms from './GetGyms';

// Component for getting the clicked position and setting the marker.
const GetCoordinates = ({ setPosition }) => {
    const map = useMap();


    useEffect(() => {
        if (!map) return;
        let latLong
        map.on('click', (e) => {
            latLong = e.latlng;
            map.setView(latLong, 18)
            console.log("LATLONG: ", latLong);
            setPosition([latLong.lat, latLong.lng])
        })
    }, [map])
    return null
}


// COmponent where the GymMap is, 
function GymMap({ latLong, setLatLong, points }) {
    // a map ref for setting the view of the map.
    const mapRef = useRef()

    // Used for setting the starting position of the center of the 
    // map and the starting position of the marker.
    const [position, setPosition] = useState([14.611185, 121.113449])
    // Initializing the image and size of the markerIcon.
    const markerIcon = L.icon({
        iconUrl: require("../images/place.png"),
        iconRetinaUrl: require("../images/place.png"),
        iconSize: [42, 42]
    })

    // Triggered when the latLong passed from the Gym.jsx changes. 
    // sets a new position, and changes the current view of the map. 
    useEffect(() => {
        console.log("MAPREF CURRENT: ", mapRef.current);
        if (!mapRef.current) return;
        console.log("SETTING POSITION, LAT AND LONG: ", parseFloat(latLong[0]), parseFloat(latLong[1]));
        setPosition([parseFloat(latLong[0]), parseFloat(latLong[1])])
        mapRef.current.setView({ lat: parseFloat(latLong[0]), lng: parseFloat(latLong[1]) }, 18, { animate: true, duration: 1 });
    }, [latLong])
    // an event handler of the Marker. gets the latitude and the longitude
    // of the marker when it is dragged, and sets the latLong.
    const eventHandlers = useMemo(() => ({
        dragend(e) {
            const latlng = e.target.getLatLng()
            console.log("LATLNG: ", latlng);
            setLatLong([parseFloat(latlng.lat), parseFloat(latlng.lng)])
        },
    }))


    return (
        <div className="map" >
            <MapContainer ref={mapRef} center={position} zoom={18} scrollWheelZoom={true} style={{ height: "500px", width: "450px" }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <Marker eventHandlers={eventHandlers} position={position} draggable={true} icon={markerIcon}>
                    <Popup>
                        <h4>Your Position</h4> <br /> <p>lat: {position[0]} lng: {position[1]}</p>
                    </Popup>
                </Marker>

                <GetGyms points={points} />

                <GetCoordinates setPosition={setPosition} />

            </MapContainer>
        </div>

    )
}


export default GymMap
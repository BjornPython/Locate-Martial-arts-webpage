import { useEffect, useRef, useState } from 'react';
import L, { setOptions } from "leaflet"
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { useMap } from 'react-leaflet/hooks'
import { Marker, useMapEvent } from "react-leaflet";
import { Popup } from "react-leaflet/Popup";
import "leaflet/dist/leaflet.css";
import "../css/gymMap.css"


const GetCoordinates = () => {
    const map = useMap();

    useEffect(() => {
        if (!map) return;
        let latLong


        map.on('click', (e) => {
            latLong = e.latlng;
            map.setView(latLong, 18)
            console.log(latLong);

        })


    }, [map])


    return null

}

function GymMap({ state, handleTest }) {



    const mapRef = useRef()
    console.log("MAP REF: ", mapRef);

    const markerIcon = L.icon({
        iconUrl: require("../images/location.png"),
        iconRetinaUrl: require("../images/location.png"),
        iconSize: [42, 42]
    })

    const [latlongFormData, setlatlongFormData] = useState({
        lat: "",
        long: ""
    })

    const { lat, long } = latlongFormData

    const changeLogilatlongnForm = (e) => {
        setlatlongFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const submitLatLong = (e) => {
        e.preventDefault()
        console.log("Submitting");
        console.log("LAT: ", parseFloat(lat), " LONG: ", parseFloat(long));
        setPosition([parseFloat(lat), parseFloat(long)])
        console.log("LAT: ", parseFloat(lat), "LONG: ", parseFloat(long));
        console.log(mapRef.current.setView({ lat: parseFloat(lat), lng: parseFloat(long) }, 18, { animate: true, duration: 1 }));

    }


    const [position, setPosition] = useState([41.8719, 12.5674])


    useEffect(() => {
        console.log("effect");
    })





    return (
        <div className="map" >
            <button onClick={handleTest}>CLICK</button>
            <MapContainer ref={mapRef} center={position} zoom={18} scrollWheelZoom={true} style={{ height: "500px", width: "450px" }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <Marker position={position} icon={markerIcon}>
                    <Popup>
                        You <br /> {position}
                    </Popup>
                </Marker>
                <GetCoordinates />


            </MapContainer>
            {/* 
            <form action="" onSubmit={submitLatLong} className="login-form">
                <input className="font" type="text" name="lat" value={lat} placeholder={"lat"} onChange={changeLogilatlongnForm} />
                <hr />
                <input className="font" type="text" name="long" value={long} placeholder={"long"} onChange={changeLogilatlongnForm} />
                <hr />
                <button type="submit">Submit</button>
            </form> */}
        </div>

    )
}


export default GymMap
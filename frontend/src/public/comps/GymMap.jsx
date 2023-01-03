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

function GymMap({ latLong, goSearch }) {



    const mapRef = useRef()
    // console.log("MAP REF: ", mapRef);

    const markerIcon = L.icon({
        iconUrl: require("../images/location.png"),
        iconRetinaUrl: require("../images/location.png"),
        iconSize: [42, 42]
    })



    const [position, setPosition] = useState([41.8719, 12.5674])


    // // const handleSearch = () => {
    // console.log("SETTING POSITION, LAT AND LONG: ", latLong[0], latLong[1]);
    // setPosition([parseFloat(latLong[0]), parseFloat(latLong[1])])
    // console.log("mapref.current", mapRef);
    // console.log(mapRef.current.setView({ lat: parseFloat(latLong[0]), lng: parseFloat(latLong[1]) }, 18, { animate: true, duration: 1 }));
    // // };


    useEffect(() => {
        console.log("MAPREF CURRENT: ", mapRef.current);
        if (!mapRef.current) return;
        console.log("SETTING POSITION, LAT AND LONG: ", latLong[0], latLong[1]);
        setPosition([parseFloat(latLong[0]), parseFloat(latLong[1])])
        console.log(mapRef.current.setView({ lat: parseFloat(latLong[0]), lng: parseFloat(latLong[1]) }, 18, { animate: true, duration: 1 }));


    }, [latLong])





    return (
        <div className="map" >
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
        </div>

    )
}


export default GymMap
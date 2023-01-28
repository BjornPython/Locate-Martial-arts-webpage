import React from 'react'
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from "leaflet"
import { Marker, Popup } from 'react-leaflet';
import "../../../css/loggedin/Umaps/UhelperComponent.css"

const GymMarkerIcon = L.icon({
    iconUrl: require("../../../images/icons/punching-bag.png"),
    iconRetinaUrl: require("../../../images/icons/punching-bag.png"),
    iconSize: [42, 42]

})

const CoachMarkerIcon = L.icon({
    iconUrl: require("../../../images/icons/coach.png"),
    iconRetinaUrl: require("../../../images/icons/coach.png"),
    iconSize: [42, 42]

})

const StudentMarkerIcon = L.icon({
    iconUrl: require("../../../images/icons/student.png"),
    iconRetinaUrl: require("../../../images/icons/student.png"),
    iconSize: [42, 42]

})




// Moves the maps center to the location of the marker.
const ChangeMapCenter = ({ lat, long }) => {
    const map = useMap();

    useEffect(() => {
        if (lat && long) {
            map.setView([lat, long], 18)

        }

    }, [lat, long])
}

const MoveMarkerOnClick = ({ updateUserInfo }) => {
    const map = useMap()

    useEffect(() => {
        map.on("click", (e) => {
            updateUserInfo(e.latlng.lat, e.latlng.lng)
        })
    }, [])
}

const ShowMarkers = ({ data, markerIcon }) => {
    console.log("DATA: ", data);
    return data.map((marker, index) => {
        console.log("marker: ", marker);
        console.log("POSITION: ", { lat: marker.location.lat, lng: marker.location.long });
        return (
            <Marker
                key={index}
                position={[marker.location.lat, marker.location.long]}
                icon={markerIcon}
            >
                <Popup minWidth={200}>
                    <div className='marker-popup-div'>
                        <div className='marker-pop-up-name'>
                            <h3>{marker.name}</h3>
                            <span className='name-span' />
                            <h4 className='popup-bio'>{marker.coach ? "COACH" : "STUDENT"}</h4>
                        </div>

                        <div className='popup-info-div'>
                            <span className='popup-info-span' />

                            <ul>
                                {Object.keys()}
                            </ul>
                        </div>

                    </div>
                </Popup>
            </Marker>
        )
    })
}






function HelperComponent({ lat, long, updateUserInfo, markerPoints }) {
    const { gyms, coaches, spartners } = markerPoints
    return (
        <>
            <ChangeMapCenter lat={lat} long={long} updateUserInfo={updateUserInfo} />
            <MoveMarkerOnClick updateUserInfo={updateUserInfo} />
            <ShowMarkers data={gyms} markerIcon={GymMarkerIcon} />
            <ShowMarkers data={coaches} markerIcon={CoachMarkerIcon} />
            <ShowMarkers data={spartners} markerIcon={StudentMarkerIcon} />
        </>
    )
}

export default HelperComponent
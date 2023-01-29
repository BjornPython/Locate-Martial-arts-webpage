import React from 'react'
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from "leaflet"
import { Marker, Popup } from 'react-leaflet';
import "../../../css/loggedin/Umaps/UhelperComponent.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-solid-svg-icons';

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

const ShowMarkers = ({ data, markerIcon, type }) => {
    return data.map((marker) => {
        return (
            <Marker
                key={marker._id}
                position={[marker.location.lat, marker.location.long]}
                icon={markerIcon}
            >
                {type !== "gyms"
                    ?
                    <Popup minWidth={200}>
                        <div className='marker-popup-div'>
                            <div className='marker-popup-name-msg'>
                                <div className='marker-pop-up-name'>
                                    <h2>{marker.name}</h2>
                                    <h4 className='popup-bio'>{marker.coach ? "COACH" : "STUDENT"}</h4>
                                </div>

                                <FontAwesomeIcon icon={faMessage} className="popup-msg-icn" />
                            </div>


                            <div className='popup-info-div'>
                                <span className='popup-info-span' />
                                <h4>Finding Spartner in: </h4>
                                <div className='popup-ul'>
                                    {Object.keys(marker.lfSparArts).map((art, index) => { return <h4 key={index}>● {art}</h4> })}
                                </div>
                            </div>

                            <div className='popup-info-div'>
                                <span className='popup-info-span' />
                                <h4>Coaches: </h4>
                                <div className='popup-ul'>
                                    {Object.keys(marker.teaches).map((art, index) => { return <h4 key={index}>● {art}</h4> })}
                                </div>
                            </div>

                        </div>
                    </Popup>
                    :
                    <Popup>{marker.name}</Popup>
                }
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
            <ShowMarkers data={gyms} markerIcon={GymMarkerIcon} type="gyms" />
            <ShowMarkers data={coaches} markerIcon={CoachMarkerIcon} type="coaches" />
            <ShowMarkers data={spartners} markerIcon={StudentMarkerIcon} type="spartners" />
        </>
    )
}

export default HelperComponent
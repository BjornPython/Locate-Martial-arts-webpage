import React, { useEffect } from 'react'
import { Marker, Popup } from 'react-leaflet'
import L from "leaflet"
import { useState } from 'react'

import apiService from "../../features/apis/apiService"
import { set } from 'mongoose'
import e from 'cors'


const GymMarkerIcon = L.icon({
    iconUrl: require("../images/icons/punching-bag.png"),
    iconRetinaUrl: require("../images/icons/punching-bag.png"),
    iconSize: [42, 42]

})

const CoachMarkerIcon = L.icon({
    iconUrl: require("../images/icons/coach.png"),
    iconRetinaUrl: require("../images/icons/coach.png"),
    iconSize: [42, 42]

})

const StudentMarkerIcon = L.icon({
    iconUrl: require("../images/icons/student.png"),
    iconRetinaUrl: require("../images/icons/student.png"),
    iconSize: [42, 42]

})


const MyMarkers = ({ data, type }) => {
    if (!data) { return }
    let iconStyle;
    if (type === "gym") { iconStyle = GymMarkerIcon }
    else if (type === "coach") { iconStyle = CoachMarkerIcon }
    else { iconStyle = StudentMarkerIcon }
    return data.map(({ lat, lng, title }, index) => (
        <Marker
            key={index}
            position={{ lat, lng }}
            icon={iconStyle}
        >
            <Popup>{title}</Popup>
        </Marker>
    ));
}


function GetGyms({ searchInfo }) {


    const [gymLocations, setGymLocations] = useState(null)
    const [coachLocations, setCoachLocations] = useState(null)
    const [studentLocations, setStudentLocations] = useState(null)


    useEffect(() => {
        if (!searchInfo) { return }
        console.log("searchInfo has been changed");
        console.log("SEARCH INFO: ", searchInfo);
        const { location, marts } = searchInfo

        if (searchInfo.lf.includes("gym")) {
            // Get gyms data from gym database
            console.log("IN GYM");
            const getGymData = async () => {
                const gymData = await apiService.findGyms([parseFloat(location[0]), parseFloat(location[0])], JSON.stringify(marts))
                console.log(gymData);
                const gymPoints = gymData.data.map((gym) => {
                    return { lat: gym.location.lat, lng: gym.location.long, title: gym.name }
                })
                console.log("GYM POINTS: ", gymPoints);
                setGymLocations(gymPoints)
            }
            getGymData()
        }

        if (searchInfo.lf.includes("coach")) {
            // Get users data with coach==true from user database
            console.log("IN COACH");

        }

        if (searchInfo.lf.includes("spartner")) {
            // Get users data with lfspartner==true from user database
            console.log("IN SPARTNER");
            const getUserData = async () => {
                const sparringUsers = await apiService.findSparringPartners()
                console.log(sparringUsers);
            }

            getUserData()
        }



    }, [searchInfo])



    return (
        <div>
            <MyMarkers data={gymLocations} type="gym" ></MyMarkers>
            <MyMarkers data={coachLocations} type="coach" ></MyMarkers>
            <MyMarkers data={studentLocations} type="student" ></MyMarkers>
        </div>
    )
}

export default GetGyms


// Search Information (searchInfo) goes from MapForm.jsx, to Gym.jsx, to GymMap.jsx, to GetGyms.jsx.
// when searchInfo changes, useEffect Triggers and will query request information from the databases
// depending on what is included in the variable "lf".

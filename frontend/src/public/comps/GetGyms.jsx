import React, { useEffect } from 'react'
import { Marker, Popup } from 'react-leaflet'
import L from "leaflet"
import { useState } from 'react'

import apiService from "../../features/apis/apiService"
import { set } from 'mongoose'
import e from 'cors'


const GymMarkerIcon = L.icon({
    iconUrl: require("../images/punching-bag.png"),
    iconRetinaUrl: require("../images/punching-bag.png"),
    iconSize: [42, 42]

})

const CoachMarkerIcon = L.icon({
    iconUrl: require("../images/punching-bag.png"),
    iconRetinaUrl: require("../images/punching-bag.png"),
    iconSize: [42, 42]

})

const StudentMarkerIcon = L.icon({
    iconUrl: require("../images/punching-bag.png"),
    iconRetinaUrl: require("../images/punching-bag.png"),
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

        if (searchInfo.lf.includes("gym")) {
            // Get gyms data from gym database
            const getGymsData = async () => {
                try {
                    const response = await apiService.findGyms();
                    const addressPoints = response.data.map((gym) => {
                        return { lat: gym.location.lat, lng: gym.location.long, title: gym.location.name }
                    })
                    console.log(addressPoints);
                } catch (err) {
                    console.error(err)
                }
            };

            getGymsData()
        }

        if (searchInfo.lf.includes("coach")) {
            // Get coach data from coach database
        }

        if (searchInfo.lf.includes("spartner")) {
            //Get Spartners data from coach and student database

        }



    }, [searchInfo])

    useEffect(() => {
        console.log("searchInfo has been changed");
        console.log(searchInfo);
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

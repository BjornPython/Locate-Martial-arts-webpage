import React, { useEffect } from 'react'
import { Marker, Popup } from 'react-leaflet'
import L from "leaflet"
import { useState } from 'react'
import "../css/getGyms.css"
import apiService from "../../features/apis/apiService"
import { set } from 'mongoose'
import e from 'cors'
import axios from 'axios'


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


const MyMarkers = ({ data }) => {
    if (!data) { return }


    const markers = data.map(({ lat, lng, title, type }, index) => {
        let iconStyle;
        if (type === "gym") { iconStyle = GymMarkerIcon }
        else if (type === "coach") { iconStyle = CoachMarkerIcon }
        else { iconStyle = StudentMarkerIcon }
        return (
            <Marker
                key={index}
                position={{ lat, lng }}
                icon={iconStyle}
            >
                <Popup>
                    <div className='markers'>
                        <h4>name: {title}</h4>
                    </div>
                </Popup>
            </Marker>
        )
    }


    );


    return markers
}


function GetGyms({ searchInfo }) {


    const [gymLocations, setGymLocations] = useState(null)
    const [coachLocations, setCoachLocations] = useState(null)
    const [spartnerLocations, setSpartnerLocations] = useState(null)


    useEffect(() => {
        if (!searchInfo) { return }
        console.log("searchInfo has been changed");
        console.log("SEARCH INFO: ", searchInfo);
        const { location, marts } = searchInfo

        if (searchInfo.lf.includes("gym")) {
            // Get gyms data from gym database
            console.log("IN GYM");
            const getGymData = async () => {
                const gymData = await apiService.findGyms(location, JSON.stringify(marts))
                console.log(gymData);
                try {
                    const gymPoints = gymData.data.map((gym) => {
                        return { lat: gym.location.lat, lng: gym.location.long, title: gym.name, type: "gym" }
                    })
                    console.log("GYM POINTS: ", gymPoints);
                    setGymLocations(gymPoints)
                } catch (err) {
                    console.log(err);
                }

            }
            getGymData()
        }

        if (!searchInfo.lf.includes("gym")) { setGymLocations(null) }

        if (searchInfo.lf.includes("coach")) {
            // Get users data with coach==true from user database
            console.log("IN COACH");
            const getCoachData = async () => {
                const coachUsersData = await apiService.findCoach(location)
                console.log(coachUsersData);
                const coachUsersPoints = coachUsersData.data.map((user) => {
                    return { lat: user.location.lat, lng: user.location.long, title: user.name, type: "coach" }
                })
                setCoachLocations(coachUsersPoints);
            }
            getCoachData()
        }
        if (!searchInfo.lf.includes("coach")) { setCoachLocations(null) }

        if (searchInfo.lf.includes("spartner")) {
            // Get users data with lfspartner==true from user database
            console.log("IN SPARTNER");
            const getSpartnerData = async () => {
                const sparringUsersData = await apiService.findSparringPartners({
                    location: { lat: location[0], long: location[1] },
                    marts
                })
                console.log(sparringUsersData);
                const sparringUsersPoints = sparringUsersData.data.map((user) => {
                    const type = user.coach ? "coach" : "student"
                    console.log("TYPE: ", type);
                    return { lat: user.location.lat, lng: user.location.long, title: user.name, type }
                })
                console.log("SPARRING USERS POINTS: ", sparringUsersPoints);
                setSpartnerLocations(sparringUsersPoints)
            }

            getSpartnerData()
        }
        if (!searchInfo.lf.includes("spartner")) { setSpartnerLocations(null) }


    }, [searchInfo])



    return (
        <div>
            <MyMarkers data={gymLocations} type="gym" ></MyMarkers>
            <MyMarkers data={coachLocations} ></MyMarkers>
            <MyMarkers data={spartnerLocations} ></MyMarkers>
        </div>
    )
}

export default GetGyms


// Search Information (searchInfo) goes from MapForm.jsx, to Gym.jsx, to GymMap.jsx, to GetGyms.jsx.
// when searchInfo changes, useEffect Triggers and will query request information from the databases
// depending on what is included in the variable "lf".

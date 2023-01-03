import React from 'react'
import { useState } from 'react'
import "../css/mapForm.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faSquareFacebook } from "@fortawesome/free-brands-svg-icons"


function MapForm({ handleSearch }) {


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

    const onSearchAddress = (e) => {
        e.preventDefault()
        console.log("ADDRESS");
    }

    const onSearchLatLong = (e) => {
        e.preventDefault()
        console.log("E: ", e);
        console.log("LATLONG: ", lat, long);
        if (lat === "" || long === "") return;
        handleSearch(lat, long)
    }


    return (
        <div className='map-form'>

            <form action="" className="address-form">
                <input className="address font" type="text" name="lat" value={lat} placeholder="Address" onChange={changeLogilatlongnForm} />

                <button onClick={onSearchAddress} className="address-btn"><FontAwesomeIcon icon={faSearch} className="search-fnt" />
                </button>
            </form>

            <form action="" className="latLong-form">
                <input className="font" type="text" name="lat" value={lat} placeholder={"lat"} onChange={changeLogilatlongnForm} />
                <hr />
                <input className="font" type="text" name="long" value={long} placeholder={"long"} onChange={changeLogilatlongnForm} />
                <hr />
                <button onClick={onSearchLatLong}>Search</button>
            </form>


        </div>
    )
}

export default MapForm
import React from 'react'
import { useState } from 'react'
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


    const onSearch = (e) => {
        e.preventDefault()
        console.log("E: ", e);
        console.log("LATLONG: ", lat, long);
        handleSearch(lat, long)
    }


    return (
        <div className='map-form'>

            <form action="" className="login-form">
                <input className="font" type="text" name="lat" value={lat} placeholder={"lat"} onChange={changeLogilatlongnForm} />
                <hr />
                <input className="font" type="text" name="long" value={long} placeholder={"long"} onChange={changeLogilatlongnForm} />
                <hr />
                <button onClick={onSearch}>Search</button>
            </form>

        </div>
    )
}

export default MapForm
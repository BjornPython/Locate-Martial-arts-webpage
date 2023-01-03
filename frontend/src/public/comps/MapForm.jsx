import React from 'react'
import { useState } from 'react'
import "../css/mapForm.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faCaretDown } from '@fortawesome/free-solid-svg-icons'


function MapForm({ handleSearch }) {


    const [latlongFormData, setlatlongFormData] = useState({
        lat: "",
        long: "",
        arts: ""
    })

    const { lat, long, arts } = latlongFormData

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
            <div className='address-div'>
                <form action="" className="address-form">
                    <input className="address font" type="text" name="lat" value={lat} placeholder="Search Your Area" onChange={changeLogilatlongnForm} />

                    <button onClick={onSearchAddress} className="address-btn"><FontAwesomeIcon icon={faSearch} className="search-fnt" />
                    </button>
                </form>
                <h1>FIND A? </h1>
                <p>(what are you looking for?)</p>
                <div className='find-btns'>
                    <button className='find-btn'>GYM</button>
                    <button className='find-btn'>COACH</button>
                    <button className='find-btn'>SPARTNER</button>
                </div>
                <h1>WHAT MARTIAL ART? </h1>

                <div className='select-m-arts'>
                    <h3>Select Martial Arts...</h3>
                    <FontAwesomeIcon icon={faCaretDown} className="dd-icon" />
                </div>
                <div className='marts-dropdown '>
                    <div className='m-art'><h3>Muay Thai</h3></div>
                    <div className='m-art'><h3>Mixed Martial Arts</h3></div>
                    <div className='m-art'><h3>Brazilian Jiu Jitsu</h3></div>
                    <div className='m-art'><h3>Boxing</h3></div>
                    <input className="others font" type="text" name="arts" value={arts} placeholder="Other..." onChange={changeLogilatlongnForm} />

                </div>

            </div>


            <form action="" className="latLong-form">
                <input className="font" type="text" name="lat" value={lat} placeholder={"lat"} onChange={changeLogilatlongnForm} />
                <hr />
                <input className="font" type="text" name="long" value={long} placeholder={"long"} onChange={changeLogilatlongnForm} />
                <hr />
                <button onClick={onSearchLatLong}>Search</button>
            </form>




        </div >
    )
}

export default MapForm
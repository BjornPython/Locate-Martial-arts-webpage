import React, { useEffect } from 'react'
import { useState } from 'react'
import "../css/mapForm.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faCaretDown, faLocation, faL } from '@fortawesome/free-solid-svg-icons'


function MapForm({ handleSearch, handleAddressSearch }) {



    const [latlongFormData, setlatlongFormData] = useState({
        lat: "",
        long: ""
    })

    const { lat, long, arts } = latlongFormData

    const [searchData, setSearchData] = useState({
        address: "",
        lf: [],
        marts: []
    })

    const { address, lf, marts } = searchData

    const changeAddressData = (e) => {
        setSearchData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }


    const changeFormData = (e) => {
        setlatlongFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const onSearchAddress = (e) => {
        e.preventDefault()
        console.log("ADDRESS");
    }


    const test = (art) => {
        console.log(`${art} clicked`);
        let newSearchData = searchData.marts.push(art)
        setSearchData(newSearchData)
    }


    const successCallback = async (success) => {
        console.log(success);
        console.log("LATLONG: ", success.coords.latitude, success.coords.longitude)
        console.log("CHANGING LATLONGFORMDATA...");
        setlatlongFormData({ lat: success.coords.latitude, long: success.coords.longitude })


    }

    const errorCallback = (error) => {
        console.log(error);
    }


    const getLocation = (e) => {
        e.preventDefault()
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback)

    }

    useEffect(() => {
        if (lat === "" || long === "") { return }
        console.log("LATLONG FORMDATA: ", latlongFormData);
        console.log(lat);
        console.log(long);
        handleSearch(lat, long)

        console.log("SEARCH DATA: ", searchData);

    }, [latlongFormData, searchData])

    return (
        <div className='map-form'>
            <div className='address-div'>
                <form action="" className="address-form">
                    <button className='loc-btn' onClick={getLocation}><FontAwesomeIcon icon={faLocation} className="loc-fnt" /></button>

                    <input className="address font" type="text" name="address" value={address} placeholder="Search Your Area" onChange={changeAddressData} />

                    <button onClick={onSearchAddress} className="address-btn"><FontAwesomeIcon icon={faSearch} className="search-fnt" />
                    </button>
                </form>

                <h1>FIND A? </h1>
                <p>(what are you looking for?)</p>
                <div className='find-btns'>
                    <button className='find-btn font'>GYM</button>
                    <button className='find-btn font'>COACH</button>
                    <button className='find-btn font'>SPARTNER</button>
                </div>
                <h1>WHAT MARTIAL ART? </h1>

                <div className='select-m-arts'>
                    <h3>Select Martial Arts...</h3>
                    <FontAwesomeIcon icon={faCaretDown} className="dd-icon" />
                    <span className='select-span'></span>
                </div>
                <div className='marts-dropdown'>
                    <div id='m-art-muay' className='m-art' onClick={() => { test("Muay thai") }}>
                        <span id="muay-span" className='m-art-span'></span>
                        <h3>Muay Thai</h3>
                    </div>
                    <div id='m-art-mma' className='m-art' onClick={() => { test("Mixed Martial Arts") }}>
                        <span id='mma-span' className='m-art-span'></span>
                        <h3>Mixed Martial Arts</h3>
                    </div>
                    <div id='m-art-bjj' className='m-art' onClick={() => { test("Brazilian Jiu Jitsu") }}>
                        <span id='mma-span' className='m-art-span'></span>
                        <h3>Brazilian Jiu Jitsu</h3>
                    </div>
                    <div id='m-art-bxg' className='m-art' onClick={() => { test("Boxing") }}>
                        <span id='bxg-span' className='m-art-span'></span>
                        <h3>Boxing</h3>
                    </div>
                    <div id='m-art-ktd' className='m-art' onClick={() => { test("Karate") }}>
                        <span id='ktd-span' className='m-art-span'></span>
                        <h3>Karate</h3>
                    </div>
                    <div id='m-art-wrs' className='m-art' onClick={() => { test("Wrestling") }}>
                        <span id='wrs-span' className='m-art-span'></span>
                        <h3>Wrestling</h3>
                    </div>
                    <div id='m-art-sbo' className='m-art' onClick={() => { test("Sambo") }}>
                        <span id='sbo-span' className='m-art-span'></span>
                        <h3>Sambo</h3>
                    </div>
                    <input className="others font" type="text" name="arts" value={arts} placeholder="Other..." onChange={changeFormData} />
                </div>


            </div>




        </div >
    )
}

export default MapForm
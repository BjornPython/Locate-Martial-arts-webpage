import React, { useEffect } from 'react'
import { useState } from 'react'
import "../css/mapForm.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faCaretDown, faLocation, faL } from '@fortawesome/free-solid-svg-icons'
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import Addresses from './Addresses'

function MapForm({ handleSearch, handleAddressSearch }) {

    //provider for the address input autocomplete.
    const provider = new OpenStreetMapProvider();

    // Latitude and Longitude Data used for centering the map and pinning.
    const [userLatLong, setUserLatLong] = useState({
        lat: "",
        long: ""
    })
    const { lat, long } = userLatLong


    // The information the user is looking for. (gym/coach/spartner, martial arts) 
    const [searchData, setSearchData] = useState({
        lf: [],
        marts: ""
    })
    const { lf, marts } = searchData
    const changeAddressData = (e) => {
        setSearchData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    // The user's inputted Address.
    const [searchedAddress, setSearchedAddress] = useState({ address: "" })
    const { address } = searchedAddress
    const changeSearchedAddress = (e) => {
        console.log("CURRENT ADDRESS: ", address);

        setSearchedAddress((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const [addressResults, setAddressResults] = useState([])

    // Will pin the marker on the first result from the autocomplete when address is submitted.
    const onSearchAddress = (e) => {
        e.preventDefault()
        console.log("ADDRESS");
    }


    const test = (art) => {
        console.log(`${art} clicked`);
        let newSearchData = searchData.marts.push(art)
        setSearchData(newSearchData)
    }

    // Function and Callbacks for requesting and getting the user's location.
    const successCallback = async (success) => {
        console.log(success);
        console.log("LATLONG: ", success.coords.latitude, success.coords.longitude)
        console.log("CHANGING LATLONGFORMDATA...");
        setUserLatLong({ lat: success.coords.latitude, long: success.coords.longitude })
    }
    const errorCallback = (error) => {
        console.log(error);
    }
    const getLocation = (e) => {
        e.preventDefault()
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback)

    }

    // Called when an address is clicked. 
    const handleAddressClick = (x, y) => {
        setUserLatLong({ lat: y, long: x })
    }



    // Triggered when latLongFormData is changed. calls the 
    // handleSearch function to pin and center the map.
    useEffect(() => {
        if (lat === "" || long === "") { return }
        console.log("LATLONG FORMDATA: ", userLatLong);
        handleSearch(lat, long)
    }, [userLatLong])


    // Triggered everytime the address input changes. 
    // Calls the provider.search to get the address results.
    useEffect(() => {
        const fetchAddresses = async () => {
            const res = await provider.search({ query: address })
            res.forEach((loc) => {
                console.log(loc.label);
            })
        }
        fetchAddresses()
            .catch(console.error)
    }, [address])



    return (
        <div className='map-form'>
            <div className='address-div'>

                <form action="" className="address-form">
                    <button className='loc-btn' onClick={getLocation}><FontAwesomeIcon icon={faLocation} className="loc-fnt" /></button>

                    <input className="address font" type="text" name="address" value={address} placeholder="Search Your Area" onChange={changeSearchedAddress} />

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
                    <input className="others font" type="text" name="marts" value={marts} placeholder="Other..." onChange={changeAddressData} />
                </div>

            </div>
        </div >
    )
}

export default MapForm
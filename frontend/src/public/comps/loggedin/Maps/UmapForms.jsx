import React, { useState } from 'react'
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import "../../../css/loggedin/Umaps/UmapForms.css"
import { faLocation, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UsearchResults from './UsearchResults';


function UmapForms() {
    const provider = new OpenStreetMapProvider();

    const [searchedAddress, setSearchedAddress] = useState({
        searchQuery: ""
    })
    const { searchQuery } = searchedAddress

    const [searchResults, setSearchResults] = useState(["Cainta Greenpark", "Marikina", "Pasig"])

    const changeSearchedAddress = (e) => {
        setSearchedAddress((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const getUserLocation = (e) => {
        e.preventDefault()
    }

    const searchAddress = (e) => {
        e.preventDefault()

    }
    return (
        <>
            <div className='u-map-css'>
                <form className='address-forms' >
                    <button onClick={getUserLocation}><FontAwesomeIcon className='u-loc-icon' icon={faLocation} /></button>
                    <input className='u-address-input' type="text" name='searchQuery' value={searchQuery} onChange={changeSearchedAddress} />
                    <button onClick={searchAddress} ><FontAwesomeIcon className='u-search-icon' icon={faSearch} /></button>
                </form>

                <UsearchResults searchResults={searchResults} />

            </div>

        </>
    )
}

export default UmapForms
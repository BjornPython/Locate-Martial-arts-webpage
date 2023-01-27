import React, { useState } from 'react'
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import "../../../css/loggedin/Umaps/UmapForms.css"
import { faLocation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function UmapForms() {
    const provider = new OpenStreetMapProvider();

    const [searchedAddress, setSearchedAddress] = useState({
        searchQuery: ""
    })
    const { searchQuery } = searchedAddress

    const changeSearchedAddress = (e) => {
        setSearchedAddress((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }


    return (
        <>
            <div className='u-map-css'>
                <form >
                    <button><FontAwesomeIcon icon={faLocation} /></button>
                    <input className='u-address-input' type="text" name='searchQuery' value={searchQuery} onChange={changeSearchedAddress} />
                </form>

            </div>

        </>
    )
}

export default UmapForms
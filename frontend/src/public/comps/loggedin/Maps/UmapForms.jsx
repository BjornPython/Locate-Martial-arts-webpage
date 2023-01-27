import React, { useEffect, useState } from 'react'
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import "../../../css/loggedin/Umaps/UmapForms.css"
import { faLocation, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UsearchResults from './UsearchResults';


function UmapForms({ updateUserInfo }) {
    const provider = new OpenStreetMapProvider();

    const [searchedAddress, setSearchedAddress] = useState({
        searchQuery: ""
    })
    const { searchQuery } = searchedAddress

    const [searchResults, setSearchResults] = useState([])

    const [showSearchResults, setShowSearchResults] = useState(false)

    const [timeoutId, setTimeoutId] = useState(null);

    useEffect(() => {
        if (searchResults.length > 1) {
            setShowSearchResults(true)
        } else {
            setShowSearchResults(false)
        }
    }, [searchResults])

    useEffect(() => {
        const fetchAddresses = async () => {

            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            setTimeoutId(setTimeout(async () => {
                const res = await provider.search({ query: searchQuery })
                // do something after .3 seconds of no state changes
                if (searchQuery === "") {
                    setSearchResults([])
                }
                else {
                    const addresses = res.slice(0, 5).map((address) => {
                        return ({ label: address.label, lat: address.raw.lat, long: address.raw.lon })
                    })
                    setSearchResults(addresses)
                }
            }, 300));


        }
        fetchAddresses()
    }, [searchQuery])




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

                <UsearchResults showSearchResults={showSearchResults} searchResults={searchResults} updateUserInfo={updateUserInfo} />

            </div>

        </>
    )
}

export default UmapForms
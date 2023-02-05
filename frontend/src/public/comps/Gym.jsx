import "../css/gym.css"
import GymMap from "./GymMap"
import { useEffect, useState } from "react"
import MapForm from "./MapForm"

function Gym() {

    const [latLong, setLatLong] = useState([])

    const [searchInfo, setSearchInfo] = useState(null)

    useEffect(() => {
        console.log("latlong changed: ", latLong)
    }, [latLong])

    const handleSearch = (lat, long) => {
        console.log("IN GYM: ", lat, long);
        setLatLong([lat, long])
        console.log("LATLONG: ", latLong);
    }

    const handleAddressSearch = (address, lf, art) => {
        console.log("IN GYM: ", address, lf, art);
    }

    const updateLatLong = (lat, long) => {
        setLatLong([lat, long])
    }


    return (
        <div className="gym-page">
            <div className="gym-components">

                <MapForm handleSearch={handleSearch} handleAddressSearch={handleAddressSearch} setSearchInfo={setSearchInfo} />

                <div className="gym-map">
                    <div className="map-bg">
                        <GymMap latLong={latLong} updateLatLong={updateLatLong} searchInfo={searchInfo} />

                    </div>
                </div>

            </div>
        </div>
    )
}

export default Gym
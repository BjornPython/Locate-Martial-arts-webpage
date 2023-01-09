import "../css/gym.css"
import GymMap from "./GymMap"
import { useState } from "react"
import MapForm from "./MapForm"

function Gym() {

    const [latLong, setLatLong] = useState([])

    const [points, setPoints] = useState(null)



    const handleSearch = (lat, long) => {
        console.log("IN GYM: ", lat, long);
        setLatLong([lat, long])
        console.log("LATLONG: ", latLong);
    }

    const handleAddressSearch = (address, lf, art) => {
        console.log("IN GYM: ", address, lf, art);
    }


    return (
        <div className="gym-page">
            <div className="gym-components">

                <MapForm handleSearch={handleSearch} handleAddressSearch={handleAddressSearch} setPoints={setPoints} />

                <div className="gym-map">
                    <div className="map-bg">
                        <GymMap latLong={latLong} setLatLong={setLatLong} points={points} />

                    </div>
                </div>

            </div>
        </div>
    )
}

export default Gym
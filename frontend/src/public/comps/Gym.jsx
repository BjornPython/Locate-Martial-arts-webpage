import "../css/gym.css"
import GymMap from "./GymMap"
import { useState } from "react"
import MapForm from "./MapForm"

function Gym() {

    const [latLong, setLatLong] = useState([])
    const [goSearch, setgoSearch] = useState(false)



    const handleSearch = (lat, long) => {
        console.log("IN GYM: ", lat, long);
        setLatLong([lat, long])
        console.log("LATLONG: ", latLong);
    }



    return (
        <div className="gym-page">
            <div className="gym-components">

                <MapForm handleSearch={handleSearch} />

                <div className="gym-map">
                    <div className="map-bg">
                        <GymMap latLong={latLong} />

                    </div>
                </div>

            </div>
        </div>
    )
}

export default Gym
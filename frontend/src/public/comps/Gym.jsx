import "../css/gym.css"
import GymMap from "./GymMap"

function Gym() {
    return (
        <div className="gym-page">
            <div className="gym-components">

                <div className="map-info">
                    <h1>ADDRESS</h1>

                    <h3>option</h3>
                    <h3>option</h3>
                    <h3>option</h3>
                    <h3>option</h3>
                </div>

                <div className="gym-map">
                    <div className="map-bg">
                        <GymMap />

                    </div>
                </div>

            </div>
        </div>
    )
}

export default Gym
import "../css/footer.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSquareFacebook, faSquareGithub, faSquareInstagram } from "@fortawesome/free-brands-svg-icons"
import { faMapMarkerAlt, faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons"

function Footer() {
    return (
        <div className="main-footer">

            <div className="footer-main-info">
                <div className="footer-logo">
                    <h1>LOCATE MARTIAL ARTS</h1>
                </div>
                <div className="footer-info">
                    <div className="info-grp"><FontAwesomeIcon className="info-grp-icn" icon={faMapMarkerAlt} />
                        <p>#20, Sample St., Address Village, Sample City.</p>
                    </div>
                    <div className="info-grp"><FontAwesomeIcon className="info-grp-icn" icon={faPhone} />
                        <p>+123 - 4567 - 8910</p>
                    </div>
                    <div className="info-grp"><FontAwesomeIcon className="info-grp-icn" icon={faEnvelope} />
                        <p style={{ color: "yellow" }}>locatemartialarts@gmail.com</p>
                    </div>
                </div>
                <div className="footer-info footer-about-info">
                    <h4>ABOUT THE COMPANY</h4>
                </div>
            </div>

        </div >
    )
}

export default Footer
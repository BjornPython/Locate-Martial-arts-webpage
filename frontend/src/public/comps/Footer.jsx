import "../css/footer.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSquareFacebook, faSquareGithub, faSquareInstagram } from "@fortawesome/free-brands-svg-icons"


function Footer() {
    return (
        <div className="main-footer">
            <div className="soc--icons">
                <FontAwesomeIcon icon={faSquareFacebook} className="soc-fonts"></FontAwesomeIcon>
                <FontAwesomeIcon icon={faSquareGithub} className="soc-fonts"></FontAwesomeIcon>
                <FontAwesomeIcon icon={faSquareInstagram} className="soc-fonts"></FontAwesomeIcon>
            </div>

            <span className="footer-line"></span>

            <div className="footer-infos">
                <div className="footer-info">
                    <h3>Contact Us</h3>
                </div>
                <div className="footer-info">
                    <h3>About Us</h3>
                </div>
                <div className="footer-info">
                    <h3>FAQs</h3>
                </div>
            </div>


        </div >
    )
}

export default Footer
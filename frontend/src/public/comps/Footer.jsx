import "../css/footer.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSquareFacebook, faSquareGithub, faSquareInstagram } from "@fortawesome/free-brands-svg-icons"


function Footer() {
    return (
        <div className="main-footer">
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

            <hr className="footer-line" />

            <div className="soc-icons">
                <a href="#"><FontAwesomeIcon icon={faSquareFacebook} className="soc-fonts"></FontAwesomeIcon></a>
                <a href="#"><FontAwesomeIcon icon={faSquareGithub} className="soc-fonts"></FontAwesomeIcon></a>
                <a href="#"><FontAwesomeIcon icon={faSquareInstagram} className="soc-fonts"></FontAwesomeIcon></a>
            </div>
            <h4 className="copyright">@Copyright. All RIghts Reserved.</h4>


        </div >
    )
}

export default Footer
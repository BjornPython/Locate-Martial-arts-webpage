import "../css/footer.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSquareFacebook, faSquareGithub, faSquareInstagram } from "@fortawesome/free-brands-svg-icons"


function Footer() {
    return (
        <div className="main-footer">

            <FontAwesomeIcon icon={faSquareFacebook} className="soc-fonts"></FontAwesomeIcon>
            <FontAwesomeIcon icon={faSquareGithub} className="soc-fonts"></FontAwesomeIcon>
            <FontAwesomeIcon icon={faSquareInstagram} className="soc-fonts"></FontAwesomeIcon>
        </div >
    )
}

export default Footer
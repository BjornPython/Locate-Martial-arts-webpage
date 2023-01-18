import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function UprofileFinding() {
    return (
        <div className="looking-for">
            <div className="u-for">
                <h4>Looking for a Sparring Partner:</h4>
                <h4 className='looking-for-dropdown'>Sparring partner in...  <FontAwesomeIcon icon={faCaretDown} /></h4>
                <div className="spar-dropdown">
                </div>
            </div>

            <div className="u-for">
                <h4>Looking for a Coach:</h4>
                <h4 className='looking-for-dropdown'>Coach in...  <FontAwesomeIcon icon={faCaretDown} /></h4>
                <div className="spar-dropdown">
                </div>
            </div>
        </div>
    )
}

export default UprofileFinding
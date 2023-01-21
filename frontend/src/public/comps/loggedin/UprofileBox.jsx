import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faGear } from '@fortawesome/free-solid-svg-icons'

function UprofileBox({ name, bio }) {
    return (<div className='profile-box'>
        <div className='profile'>
            <FontAwesomeIcon icon={faUser} className="profile-avatar" />
            <div className='profile-info'>
                <h2>{name}</h2>
                <p>{bio === "" || bio === undefined ? "Edit your bio" : bio}</p>
            </div>
        </div>
        <FontAwesomeIcon icon={faGear} className="u-setting-icon" />

    </div>);
}

export default UprofileBox
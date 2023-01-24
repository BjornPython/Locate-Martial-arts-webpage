import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faGear } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
const showNameBio = (name, bio) => {
    return (
        <div className='profile'>
            <FontAwesomeIcon icon={faUser} className="profile-avatar" />
            <div className='profile-info'>
                <h2>{name}</h2>
                <p>{bio === "" || bio === undefined ? "Edit your bio" : bio}</p>
            </div>
        </div>
    )
}

const showEditableNameBio = (name, bio) => {
    return (
        <div className='profile'>
            <FontAwesomeIcon icon={faUser} className="profile-avatar" />
            <div className='profile-info'>
                <input type="text" className='i-name' name="i-name" id="" placeholder={name} />
                <input type="text" className='i-bio' name="i-bio" id="" placeholder={bio !== "" ? bio : "Edit your bio"} />

            </div>
        </div>
    )
}

function UprofileBox({ name, bio }) {

    const [showEditable, setShowEditable] = useState(false)

    return (
        <div className='profile-box'>
            {showEditableNameBio(name, bio, showEditable)}
            <FontAwesomeIcon icon={faGear} className="u-setting-icon" onClick={() => { setShowEditable(!showEditable) }} />

        </div>
    );
}

export default UprofileBox
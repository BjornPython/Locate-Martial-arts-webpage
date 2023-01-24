import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faGear } from '@fortawesome/free-solid-svg-icons'
import { useState, useMemo } from 'react'
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

    const [editing, SetEditing] = useState(false)

    const showNameBio = useMemo(() => {
        console.log("CHANGED!");
        return (
            <div className='profile'>
                <FontAwesomeIcon icon={faUser} className="profile-avatar" />
                <div className='profile-info'>
                    <input type="text" name="i-name" id="" placeholder={name} className={`i-name ${editing && "edit-profile-info"}`} />
                    <input type="text" name="i-bio" id="" placeholder={bio !== "" ? bio : "Edit your bio"} className={`i-bio ${editing && "edit-profile-info"}`} />

                </div>
            </div>
        )
    }, [name, editing])

    return (
        <div className='profile-box'>
            {showNameBio}
            <FontAwesomeIcon icon={faGear} className="u-setting-icon" onClick={() => { SetEditing(!editing) }} />

        </div>
    );
}

export default UprofileBox
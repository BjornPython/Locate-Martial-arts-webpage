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
        return (
            <div className='profile'>
                <FontAwesomeIcon icon={faUser} className="profile-avatar" />
                <div className='profile-info'>
                    <h2 className='i-name'>{name}</h2>
                    <p className='i-bio'>{bio !== "" ? bio : "Edit your bio"}</p>

                </div>
            </div>
        )
    }, [name, bio])

    const showEditableNameBio = useMemo(() => {
        return (
            <div className='profile'>
                <FontAwesomeIcon icon={faUser} className="profile-avatar" />
                <div className='profile-info'>
                    <input type="text" name="i-name-edit" id="" placeholder={name} className={`i-name-edit `} />
                    <input type="text" name="i-bio-edit" id="" placeholder={bio !== "" ? bio : "Edit your bio"} className={`i-bio-edit`} />
                </div>
            </div>
        )
    }, [name, bio])

    return (
        <div className='profile-box'>
            {editing ? showEditableNameBio : showNameBio}

            <FontAwesomeIcon icon={faGear} className="u-setting-icon" onClick={() => { SetEditing(!editing) }} />

        </div>
    );
}

export default UprofileBox
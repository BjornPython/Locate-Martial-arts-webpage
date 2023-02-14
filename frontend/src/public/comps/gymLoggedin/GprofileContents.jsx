import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import GprofileMarts from './GprofileMarts';

const showPSpan = (txt) => {
    return (<><p>{txt}</p><span /></>)
}

function GprofileContents({ handleEditProfile, isEditingInfo, marts, delMart, addNewInfo, handleNewInfo, addMart }) {
    return (
        <div className="u-profile-contents">
            <FontAwesomeIcon icon={faGear} className="p-setting-icon" onClick={() => { handleEditProfile(); }} />
            <GprofileMarts isEditingInfo={isEditingInfo} marts={marts} delMart={delMart}
                handleNewInfo={handleNewInfo} addMart={addMart} addNewInfo={addNewInfo} />

            {showPSpan("People can see the martial arts your gym offers.")}

        </div>
    )
}

export default GprofileContents
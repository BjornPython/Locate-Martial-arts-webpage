import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import GprofileMarts from './GprofileMarts';
import GprofileAwards from './GprofileAwards';


const showPSpan = (txt) => {
    return (<><p>{txt}</p><span /></>)
}

function GprofileContents({ handleEditProfile, isEditingInfo, marts, awards, delMart, addNewInfo, handleNewInfo, addMart, addAward, delAward }) {
    return (
        <div className="u-profile-contents">
            <FontAwesomeIcon icon={faGear} className="p-setting-icon" onClick={() => { handleEditProfile(); }} />
            <GprofileMarts isEditingInfo={isEditingInfo} marts={marts} delMart={delMart}
                handleNewInfo={handleNewInfo} addMart={addMart} addNewInfo={addNewInfo} />
            {showPSpan("People can see the martial arts your gym offers when they click your icon on the map.")}

            <GprofileAwards isEditingInfo={isEditingInfo} awards={awards} addNewInfo={addNewInfo} addAward={addAward}
                handleNewInfo={handleNewInfo} delAward={delAward} />
            {showPSpan("People can see your gym's awards when they click your icon on the map.")}
        </div>
    )
}

export default GprofileContents
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import uuid from 'react-uuid'
import { useEffect } from 'react'
const showInfo = (mart, id) => {
    return (<h4 key={id}>● {mart}</h4>)
}


// Show Editable Art
const editArt = (award, id, delAward) => {
    return (
        <div key={id} className='edit-info'>
            <h4 >● {award}</h4>
            <FontAwesomeIcon icon={faXmark} className="u-delete-font" onClick={() => { delAward(award) }} />
        </div>
    )
}


function UprofileAwards({ isEditingInfo, awards, delMart, delAward, addAward, handleNewInfo, addNewInfo }) {
    useEffect(() => {
        console.log("AWARDS CHANGED: ", awards);

    }, [awards])

    return (
        <div className='u-profile-marts'>
            <h4>Achievements:</h4>
            <div className='u-profile-grp'>
                <div className='profile-marts-box'>
                    {!isEditingInfo
                        ? awards.map((award, val) => {
                            const id = uuid()
                            return showInfo(award, id, delMart)
                        })
                        : awards.map((award, val) => {
                            const id = uuid()
                            return editArt(award, id, delAward)
                        })}
                    {isEditingInfo &&
                        <div className='add-info'>
                            <input type="text" value={addAward} name="addAward" onChange={handleNewInfo} />
                            <FontAwesomeIcon icon={faPlus} className="add-info-icon" onClick={() => { addNewInfo(addAward) }} />
                        </div>}
                </div>
            </div>
        </div>
    )
}

export default UprofileAwards
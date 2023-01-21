import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import uuid from 'react-uuid'
const showInfo = (mart, id) => {
    return (<h4 key={id}>● {mart}</h4>)
}

// Show Editable Mart.
const editMart = (mart, id, delMart) => {
    return (
        <div key={id} className='edit-info'>
            <h4 >● {mart}</h4>
            <FontAwesomeIcon icon={faXmark} className="u-delete-font" onClick={() => { delMart(mart) }} />
        </div>
    )
}


function UprofileMarts({ isEditingInfo, marts, addMart, delMart, handleNewInfo, addNewInfo }) {



    return (
        <div className='u-profile-marts'>
            <h4>Martial Arts:</h4>
            <div className='u-profile-grp'>
                <div className='profile-marts-box'>

                    {!isEditingInfo
                        ? Object.keys(marts).map((mart, val) => {
                            const id = uuid()
                            return showInfo(mart, id)
                        })
                        : Object.keys(marts).map((mart, val) => {
                            const id = uuid()
                            return editMart(mart, id, delMart)
                        })
                    }

                    {isEditingInfo &&
                        <div className='add-info'>
                            <input type="text" value={addMart} name="addMart" onChange={handleNewInfo} />
                            <FontAwesomeIcon icon={faPlus} className="add-info-icon" onClick={() => { addNewInfo(addMart, 1) }} />
                        </div>}

                </div>
            </div>
        </div>
    )
}

export default UprofileMarts
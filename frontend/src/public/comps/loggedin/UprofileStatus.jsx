import React from 'react'

function UprofileStatus({ coach }) {
    return (
        <div className='u-profile-marts'>
            <h4>Account Status:</h4>
            <div className="u-status">
                <div className={`user-coach what-status ${coach ? "what-status-active" : null}`}>
                    <span></span>
                    <div className="status-txt"><h4>Coach</h4></div>
                </div>
                <div className={`user-stud what-status ${!coach ? "what-status-active" : null}`}>
                    <span></span>
                    <div className="status-txt"><h4>student</h4></div>
                </div>
            </div>
        </div>
    )
}

export default UprofileStatus
import { useEffect, useMemo, useState } from 'react'




function UprofileStatus({ coach, changeUserStatus, isEditingInfo }) {

    useEffect(() => {
    }, [coach])

    const callChangeUserStatus = (val) => {
        changeUserStatus(val)
    }

    // const [showCoachSpan, setShowCoachSpan] = useState(false)
    // const [showStudSpan, setShowStudSpan] = useState(false)

    return (
        <div className='u-profile-marts'>
            <h4>Account Status:</h4>
            <div className="u-status">
                <div className={`user-coach what-status ${coach && "what-status-active"}`} onClick={() => { callChangeUserStatus(1) }}>
                    <span></span>
                    <div className="status-txt"><h4>Coach</h4></div>
                </div>

                <div className={`user-stud what-status ${!coach && "what-status-active"}`} onClick={() => { callChangeUserStatus(0) }}>
                    <span></span>
                    <div className="status-txt"><h4>student</h4></div>
                </div>
            </div>
        </div>
    )
}

export default UprofileStatus
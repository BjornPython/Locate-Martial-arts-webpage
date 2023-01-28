import React from 'react'
import { useMemo } from 'react'
function UlogoutWarning({ showLogout }) {

    const warningMemo = useMemo(() => {
        console.log("WARNING MEMO");
        return (
            <div className='logout-div'>
                <h2>Confirm Logout?</h2>
                <div className='logout-btns'>
                    <div className='logout-btn'><h3>Logout</h3></div>
                    <div className='logout-btn'><h3>Cancel</h3></div>
                </div>
            </div>
        )
    }, [])

    console.log("SHOWLOGOUT: ", showLogout);

    return (
        <>
            {showLogout && warningMemo}
        </>

    )
}

export default UlogoutWarning
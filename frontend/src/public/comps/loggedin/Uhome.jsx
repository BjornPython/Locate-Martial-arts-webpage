import React from 'react'
import Unav from './Unav'
import Umessages from './Umessages'
import Uprofile from './Uprofile'
import "../../css/loggedin/uhome.css"
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'


function Uhome() {

    // Check for if user is logged in.
    const { user, isLoading, isError, isSuccess } = useSelector((state) => state.auth)
    const navigate = useNavigate()
    // redirect user to "/" if logged in
    useEffect(() => {

        if (!user) {
            console.log("NO USER, LOGGING OUT");
            navigate("/")
        }
    }, [user])

    const [currentPage, setCurrentPage] = useState("profile")


    return (
        <div className='uhome-page'>
            <Unav setCurrentPage={setCurrentPage} />
            <div className="u-home-pages">
                {currentPage === "profile" ? <Uprofile /> : null}
                {currentPage === "messages" ? <Umessages /> : null}
                {currentPage === "search" ? <Umessages /> : null}
            </div>

        </div>
    )
}

export default Uhome
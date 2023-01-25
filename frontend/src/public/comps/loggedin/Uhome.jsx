import React from 'react'
import Unav from './Unav'
import Umessages from './Umessages'
import Uprofile from './Uprofile'
import "../../css/loggedin/uhome.css"
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
// import "../../scripts/userHomeScript.js"
import "../../scripts/userHomeScript.js"
import { useMemo } from 'react'


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

    const changePage = (page) => {
        if (page === currentPage) { return }
        else { setCurrentPage(page) }
    }

    useEffect(() => {
        console.log("CURRENT PAGE CHANGED: ", currentPage);
    }, [currentPage])

    const UprofileMemo = useMemo(() => {
        return (<Uprofile user={user} />)
    })


    return (
        <div className='uhome-page'>
            <Unav changePage={changePage} currentPage={currentPage} />
            <div className="u-home-pages">
                {currentPage === "profile" && UprofileMemo}
                {currentPage === "messages" && <Umessages user={user} />}
            </div>

        </div>
    )
}

export default Uhome
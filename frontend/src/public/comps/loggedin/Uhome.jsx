import React from 'react'
import Unav from './Unav'
import Umessages from './Umessages'
import Uprofile from './Profile/Uprofile'
import Umaps from './Maps/Umaps'
import "../../css/loggedin/uhome.css"
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
// import "../../scripts/userHomeScript.js"
import "../../scripts/userHomeScript.js"
import { useMemo } from 'react'
import apiService from '../../../features/apis/apiService'

function Uhome() {

    // Check for if user is logged in.
    const { user, isLoading, isError, isSuccess } = useSelector((state) => state.auth)
    const navigate = useNavigate()
    // redirect user to "/" if logged in
    useEffect(() => {
        console.log("USER CHANGED IN UHOME");
        if (!user) {
            console.log("NO USER, LOGGING OUT");
            navigate("/")
        }
    }, [user])


    useEffect(() => {
        console.log("SETTING INFO");
        getUserInfo()
    }, [])

    const [info, setInfo] = useState(null)

    const getUserInfo = async () => {
        const response = await apiService.getUserInfo(user);
        setInfo({ ...response.data })
    }

    useEffect(() => {
        console.log("INFO: ", info);
    }, [info])


    const [currentPage, setCurrentPage] = useState("search")

    const changePage = (page) => {
        if (page === currentPage) { return }
        else { setCurrentPage(page) }
    }


    const UprofileMemo = useMemo(() => {
        return (<Uprofile user={user} info={info} />)
    }, [user, info])


    return (
        <div className='uhome-page'>
            <Unav changePage={changePage} currentPage={currentPage} />
            <div className="u-home-pages">
                {currentPage === "search" && <Umaps info={info} />}
                {currentPage === "profile" && UprofileMemo}
                {currentPage === "messages" && <Umessages user={user} />}
            </div>

        </div>
    )
}

export default Uhome
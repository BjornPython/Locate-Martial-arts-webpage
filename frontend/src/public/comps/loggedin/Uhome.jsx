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

    const navigate = useNavigate()

    const { user, isLoading, isError, isSuccess } = useSelector((state) => state.auth)
    const [info, setInfo] = useState(null)
    const [currentPage, setCurrentPage] = useState("search")


    useEffect(() => {
        if (!user) {
            navigate("/")
        }
    }, [user])

    useEffect(() => {
        getUserInfo()
    }, [])


    const getUserInfo = async () => {
        const response = await apiService.getUserInfo(user);
        setInfo({ ...response.data })
    }


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
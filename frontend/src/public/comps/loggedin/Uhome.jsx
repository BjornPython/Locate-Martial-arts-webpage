import React from 'react'
import Unav from './Unav'
import Umessages from './Messages/Umessages'
import Uprofile from './Profile/Uprofile'
import Umaps from './Maps/Umaps'
import UlogoutWarning from './UlogoutWarning'
import "../../css/loggedin/uhome.css"
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMemo } from 'react'
import apiService from '../../../features/apis/apiService'
import { logout } from '../../../features/authentication/authSlice'
import io from 'socket.io-client';

const socket = io('http://localhost:8000');

function Uhome() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user, isLoading, isError, isSuccess } = useSelector((state) => state.auth)
    const [info, setInfo] = useState(null)
    const [currentPage, setCurrentPage] = useState("messages")
    const [showLogout, setShowLogout] = useState(false)


    useEffect(() => {
        socket.on("message", (msg) => {
            console.log("MESSAGE EMMITED FROM BACKEND: ", msg);
        })

        return () => {
            console.log("DISCONNECTING");
        }
    }, [])




    useEffect(() => {
        if (!user) {
            navigate("/")
        } else {
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

    const toggleShowLogout = () => {
        setShowLogout(!showLogout)
    }

    const CallLogoutUser = () => {
        localStorage.clear();
        console.log("LOGGING OUT USER");
        dispatch(logout())
        window.location.reload()
    }


    const UprofileMemo = useMemo(() => {
        return (<Uprofile user={user} info={info} />)
    }, [user, info])


    const getMessages = (conversationId, chunk) => {
        console.log("EMITTING");
        socket.emit("requestMessage", { conversationId, chunk })
    }

    return (
        <div className="uhome-page" >
            <Unav changePage={changePage} currentPage={currentPage} toggleShowLogout={toggleShowLogout} />
            <div className={`u-home-pages ${showLogout && "blurred"}`}>
                {currentPage === "search" && <Umaps info={info} user={user} />}
                {currentPage === "profile" && UprofileMemo}
                {currentPage === "messages" && <Umessages user={user} info={info} getMessages={getMessages} />}
            </div>
            <UlogoutWarning showLogout={showLogout} toggleShowLogout={toggleShowLogout} CallLogoutUser={CallLogoutUser} />
        </ div>
    )
}

export default Uhome
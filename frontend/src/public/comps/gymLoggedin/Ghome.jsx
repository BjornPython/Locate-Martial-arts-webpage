import React from 'react'
import { useEffect, useState } from 'react'
import Unav from '../loggedin/Unav'
import { useNavigate } from 'react-router-dom'
import Uprofile from '../loggedin/Profile/Uprofile'
import { Dispatch } from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../../features/authentication/authSlice'
import UlogoutWarning from '../loggedin/UlogoutWarning'

function Ghome({ user, userType }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [currentPage, setCurrentPage] = useState("profile")
    const [showLogout, setShowLogout] = useState(false)
    const [gymInfo, setGymInfo] = useState({
        name: "",
        location: { lat: 0, long: 0 },
        awards: [],
        marts: {}
    })

    useEffect(() => {
        if (!user) {
            navigate("/")
        }
    }, [user])

    const changePage = (page) => {
        if (page === currentPage) { return }
        else { setCurrentPage(page) }
    }

    const toggleShowLogout = () => {
        setShowLogout(!showLogout)
    }

    const CallLogoutUser = () => {
        localStorage.clear();
        dispatch(logout())
        window.location.reload()
    }



    return (
        <div className="uhome-page" >
            <Unav changePage={changePage} currentPage={currentPage} toggleShowLogout={toggleShowLogout} />
            <div className={`u-home-pages ${showLogout && "blurred"}`}>
                {/* {currentPage === "search" && <Umaps info={info} user={user} createConvo={createConvo} />} */}
                {/* {currentPage === "profile" && <Uprofile user={user} info={info} />} */}
                {/* {currentPage === "messages" && <Umessages chats={chats} getMessages={getMessages} currentMessages={currentMessages}
                    userId={userId} chatName={chatName} addMessage={addMessage} changeConvo={changeConvo} messages={messages} toggleSeenConvo={toggleSeenConvo} />} */}
            </div>
            <UlogoutWarning showLogout={showLogout} toggleShowLogout={toggleShowLogout} CallLogoutUser={CallLogoutUser} />
        </ div>
    )
}

export default Ghome
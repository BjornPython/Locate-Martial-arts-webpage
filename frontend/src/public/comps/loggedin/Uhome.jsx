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
    const [currentPage, setCurrentPage] = useState("search")
    const [showLogout, setShowLogout] = useState(false)


    // states for messages
    const [messages, setMessages] = useState(Object)
    const [userId, setUserId] = useState("") // The id of the user

    const [chats, setChats] = useState([]) // The different chats the user has.

    const [convoId, setConvoId] = useState("") // The convoId of the current user's chat
    const [chatName, setChatName] = useState("")
    const [currentConvoChunk, setCurrentConvoChunk] = useState(null) // The highest Chunk of the current chat



    useEffect(() => {
        if (convoId === "") { return }
        //Everytime time the convoId changes, it will request the new messages.
        console.log("GETTING MESSAGES");
        getMessages(convoId, currentConvoChunk)
    }, [convoId])

    const changeConvo = (conversationId, highestChunk, convoName) => {
        // Changes the convo when the user clicks on a chat
        if (conversationId !== convoId) {
            setConvoId(conversationId)
            setCurrentConvoChunk(highestChunk)
            setChatName(convoName)
        }
    }

    useEffect(() => {
        console.log("MESSAGES CHANGED TO: ", messages);
    }, [messages])

    useEffect(() => {
        if (!info) { return }
        // Reorganizes the messages data from the database.
        console.log(info);
        setChats(Object.entries(info.messages).map(([key, value]) => {
            return {
                conversationId: value.conversationId,
                highestChunk: value.highestChunk,
                name: value.name
            }
        }))
        setUserId(info._id)

        socket.on("messageContents", (msgData) => {
            setMessages(prevState => {
                const newState = { ...prevState, [msgData.conversationId]: msgData.messageContent }
                return { ...newState }
            })
        })


        socket.on("newMessage", (msgData) => {
            console.log("UHOME NEWMSG: ", msgData);
            setMessages(prevState => [...prevState, msgData])
        })

        socket.on("newChat", (newChat) => {
            console.log("NEW CHAT: ", newChat);
            setChats((prevState) => {
                return [...prevState, newChat]
            })
            setCurrentPage("messages")
            setConvoId(newChat.conversationId)
            setChatName(newChat.name)
            setCurrentConvoChunk(newChat.highestChunk)
        })



        return () => {
            socket.off("messageContents");
            socket.off("newMessage");
            socket.off("newChat");
        };

    }, [info])


    useEffect(() => {
        if (!user) {
            navigate("/")
        } else {
        }
    }, [user])

    useEffect(() => {
        getUserInfo()
    }, [])

    useEffect(() => {
        console.log(chats);
    }, [chats])

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
        dispatch(logout())
        window.location.reload()
    }


    const getMessages = (conversationId, chunk) => {
        console.log("CONVO: ", messages[conversationId]);
        if (!messages[conversationId]) {
            console.log("convoId not in messages");
            socket.emit("requestMessage", { conversationId, chunk, token: user })
            socket.emit("joinConversation", { conversationId, token: user }) // will remove later, will join all convos when user logs in.
        }

    }

    const addMessage = (msg) => {
        console.log("EMMITTING");
        socket.emit("addMessage", { token: user, conversationId: convoId, message: msg, chunk: currentConvoChunk })
    }

    const createConvo = (participantOne, participantOneId, participantTwo, participantTwoId) => {
        console.log("IN CREATE CONVO");

        if (!info.messages[participantTwoId]) {
            console.log("NO CONVO");
            socket.emit("newConvo", { token: user, participantOne, participantOneId, participantTwo, participantTwoId })

        } else {
            console.log(info.messages[participantTwoId])
            setCurrentPage("messages")
            setConvoId(info.messages[participantTwoId].conversationId)
            setChatName(info.messages[participantTwoId].name)
            setCurrentConvoChunk(info.messages[participantTwoId].highestChunk)

        }
    }

    const UprofileMemo = useMemo(() => {
        return (<Uprofile user={user} info={info} />)
    }, [user, info])




    return (
        <div className="uhome-page" >
            <Unav changePage={changePage} currentPage={currentPage} toggleShowLogout={toggleShowLogout} />
            <div className={`u-home-pages ${showLogout && "blurred"}`}>
                {currentPage === "search" && <Umaps info={info} user={user} createConvo={createConvo} />}
                {currentPage === "profile" && UprofileMemo}
                {currentPage === "messages" && <Umessages chats={chats} getMessages={getMessages} messages={messages}
                    userId={userId} chatName={chatName} addMessage={addMessage} changeConvo={changeConvo} />}
            </div>
            <UlogoutWarning showLogout={showLogout} toggleShowLogout={toggleShowLogout} CallLogoutUser={CallLogoutUser} />
        </ div>
    )
}

export default Uhome
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
    const [messages, setMessages] = useState({})
    const [userId, setUserId] = useState("") // The id of the user
    const [currentMessages, setCurrentMessages] = useState([])
    const [chats, setChats] = useState({}) // The different chats the user has.

    const [convoId, setConvoId] = useState("") // The convoId of the current user's chat
    const [chatName, setChatName] = useState("")
    const [currentConvoChunk, setCurrentConvoChunk] = useState(null) // The highest Chunk of the current chat



    useEffect(() => {
        if (!info) { return }
        // Reorganizes the messages data from the database.
        setChats(info.messages)
        setUserId(info._id)

        socket.emit("usersRoom", info._id)


        socket.on("messageContents", (msgData) => {
            setMessages(prevState => {
                const newState = { ...prevState, [msgData.conversationId]: msgData.messageContent }
                return { ...newState }
            })
            setCurrentMessages(msgData.messageContent)
        })


        socket.on("newMessage", (msgData) => {
            const { conversationId, senderId, message } = msgData
            setMessages(prevState => {
                if (prevState[conversationId]) {
                    const newState = {
                        ...prevState,
                        [conversationId]: [...prevState[conversationId], { senderId, message }]
                    }
                    return { ...newState }
                } else {
                    const newState = {
                        ...prevState,
                        [conversationId]: [{ senderId, message }]
                    }
                    return { ...newState }
                }
            })
            setUserId(prevState => {
                if (prevState !== senderId) {
                    setChats(prevChats => {
                        const newChats = {
                            ...prevChats,
                            [senderId]: { ...prevChats[senderId], seen: false }
                        }
                        return newChats
                    })
                }
                return prevState
            })
            checkCurrentMessages(conversationId, senderId, message)
        }
        )

        socket.on("newChat", (newChat) => {
            setChats((prevState) => {
                return { ...prevState, newChat }
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
        if (Object.entries(chats).length < 1) { return }
        Object.entries(chats).map(([chatKey, val]) => {
            socket.emit("joinConversation", { conversationId: val.conversationId, token: user })
        })
    }, [chats])


    useEffect(() => {
        if (convoId === "") { return }
        //Everytime time the convoId changes, it will request the new messages.
        getMessages(convoId, currentConvoChunk)
    }, [convoId])



    useEffect(() => {
    }, [messages])

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

    const changeConvo = (newConvoId, highestChunk, convoName) => {
        // Changes the convo when the user clicks on a chat
        setConvoId(newConvoId)
        setCurrentConvoChunk(highestChunk)
        setChatName(convoName)
        // if (messages[newConvoId] && messages[newConvoId].length <= 1) {
        //     console.log("CONVO HAS LESS THAN 1 MESSAGES, REQUESTING MESSAGES. ");
        //     getMessages(newConvoId, highestChunk, true)
        // }

    }

    const checkCurrentMessages = (conversationId, senderId, message) => {

        setConvoId(prevState => {

            if (prevState === conversationId || prevState === senderId) {
                setCurrentMessages(prevState => {
                    return [...prevState, { senderId, message }]
                })

            }

            return prevState
        })

    }

    const getMessages = (conversationId, chunk, force = null) => {
        if (!messages[conversationId]) {
            socket.emit("requestMessage", { conversationId, chunk, token: user })
        } else if (force) {
            socket.emit("requestMessage", { conversationId, chunk, token: user })
        } else {
            setCurrentMessages(messages[conversationId])
        }

    }

    const addMessage = (msg) => {
        socket.emit("addMessage", { token: user, conversationId: convoId, message: msg, chunk: currentConvoChunk })
    }

    const createConvo = (participantOne, participantOneId, participantTwo, participantTwoId) => {

        if (!info.messages[participantTwoId]) {
            socket.emit("newConvo", { token: user, participantOne, participantOneId, participantTwo, participantTwoId })

        } else {
            setCurrentPage("messages")
            setConvoId(info.messages[participantTwoId].conversationId)
            setChatName(info.messages[participantTwoId].name)
            setCurrentConvoChunk(info.messages[participantTwoId].highestChunk)

        }
    }

    const toggleSeenConvo = (chatId, isSeen) => {
        setChats(prevState => {
            const newState = { ...prevState, [chatId]: { ...prevState[chatId], seen: isSeen } }
            return { ...newState }
        })
        socket.emit("toggleSeen", { token: user, chatId, isSeen })
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
                {currentPage === "messages" && <Umessages chats={chats} getMessages={getMessages} currentMessages={currentMessages}
                    userId={userId} chatName={chatName} addMessage={addMessage} changeConvo={changeConvo} messages={messages} toggleSeenConvo={toggleSeenConvo} />}
            </div>
            <UlogoutWarning showLogout={showLogout} toggleShowLogout={toggleShowLogout} CallLogoutUser={CallLogoutUser} />
        </ div>
    )
}

export default Uhome
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
        console.log("NEW CONVO ID: ", convoId);
        if (convoId === "") { return }
        //Everytime time the convoId changes, it will request the new messages.
        console.log("GETTING MESSAGES");
        getMessages(convoId, currentConvoChunk)
    }, [convoId])



    useEffect(() => {
        console.log("MESSAGES CHANGED: ", messages);
    }, [messages])

    useEffect(() => {
        if (!info) { return }
        // Reorganizes the messages data from the database.
        console.log(info);
        setChats(info.messages)
        setUserId(info._id)

        socket.on("messageContents", (msgData) => {
            console.log("RECEIVED MESSAGE CONTENTS FROM BACKEND");
            setMessages(prevState => {
                const newState = { ...prevState, [msgData.conversationId]: msgData.messageContent }
                return { ...newState }
            })
            setCurrentMessages(msgData.messageContent)
        })


        socket.on("newMessage", (msgData) => {
            console.log("UHOME NEWMSG: ", msgData);
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

            if (convoId === conversationId || convoId === senderId) {
                setCurrentMessages(prevState => {
                    console.log("CURRENT MESSAGES: ", prevState);
                    return [...prevState, { senderId, message }]
                })
            }

        })

        socket.on("newChat", (newChat) => {
            console.log("NEW CHAT: ", newChat);
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
        console.log(chats);
        if (Object.entries(chats).length < 1) { return }
        console.log("CHATS: ", chats);
        Object.entries(chats).map(([chatKey, val]) => {
            console.log("JOINING...: ", val.conversationId);
            socket.emit("joinConversation", { conversationId: val.conversationId, token: user })
        })
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

    const changeConvo = (newConvoId, highestChunk, convoName) => {
        // Changes the convo when the user clicks on a chat
        console.log("CURRENT CONVOID: ", convoId);
        console.log("CHANGE CONVOID TO: ", newConvoId, newConvoId !== convoId);
        setConvoId(newConvoId)
        setCurrentConvoChunk(highestChunk)
        setChatName(convoName)

    }

    const getMessages = (conversationId, chunk) => {
        console.log("CONVO: ", messages[conversationId]);
        if (!messages[conversationId]) {
            console.log("convoId not in messages");
            socket.emit("requestMessage", { conversationId, chunk, token: user })
        } else {
            setCurrentMessages(messages[conversationId])
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
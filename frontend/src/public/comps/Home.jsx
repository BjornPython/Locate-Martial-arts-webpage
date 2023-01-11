import { useState, useEffect } from "react"
import { toast } from "react-toastify"

import { useSelector, useDispatch } from "react-redux"
import { registerUser, loginUser, registerGym, reset } from "../../features/authentication/authSlice"

import "../css/home.css"

import Arts from "./Arts"
import Gym from "./Gym"

import { useNavigate } from "react-router-dom"

function Home() {
    // to use functions in the authslice
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { user, isLoading, isError, isSuccess } = useSelector((state) => state.auth)

    // redirect user to /userhome if logged in
    if (user || isSuccess) {
        navigate("/userhome")
    }


    const [loginFormData, setLoginFormData] = useState({
        loginEmail: "",
        loginPass: ""
    })
    const { loginEmail, loginPass } = loginFormData

    const [registerFormData, setRegisterFormData] = useState({
        regisName: "",
        regisEmail: "",
        regisPass: "",
        regisCPass: "",
        isUser: true
    })
    const { regisName, regisEmail, regisPass, regisCPass, isUser } = registerFormData

    const setIsUserTrue = (e) => {
        e.preventDefault()
        if (isUser === false) {
            setRegisterFormData(prevState => ({ ...prevState, isUser: true }))
        }
    }

    const setIsUserFalse = (e) => {
        e.preventDefault()
        if (isUser === true) {
            setRegisterFormData(prevState => ({ ...prevState, isUser: false }))
        }
    }

    useEffect(() => {
        console.log(registerFormData);
    }, [registerFormData])



    const changeLoginForm = (e) => {
        setLoginFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const changeRegisterForm = (e) => {
        setRegisterFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const submitLoginData = (e) => {
        e.preventDefault()

        if (loginEmail == "" || loginPass == "") {
            toast.error("Please include both Email and Password Fields.")
        }

        const userData = {
            email: loginEmail, password: loginPass
        }

        dispatch(loginUser(userData))
        navigate("/userhome")
    }

    const submitRegisData = (e) => {
        e.preventDefault()

        if (regisName == "" || regisEmail == "" || regisPass == "" || regisCPass == "") {
            toast.error("Please Fill all Fields.")
        }

        if (regisPass !== regisCPass) {
            toast.error("Passwords do not match.")
        }

        if (isUser) {
            const userData = {
                name: regisName,
                email: regisEmail,
                password: regisPass
            }

            dispatch(registerUser(userData))
        } else {
            const gymData = {
                name: regisName,
                email: regisEmail,
                password: regisPass
            }
            console.log("IN REGISTER GYM");
            dispatch(registerGym(gymData))
        }




    }

    return (

        <div className="homepage">

            <div className="home-contents">

                <div className="main-texts">

                    <div className="login-page">
                        <div className="login">

                            <h1>LOG IN</h1>
                            <form action="" onSubmit={submitLoginData} className="login-form">
                                <input className="font" type="text" name="loginEmail" value={loginEmail} placeholder={"Email"} onChange={changeLoginForm} />
                                <hr />
                                <input className="font" type="password" name="loginPass" value={loginPass} placeholder={"Password"} onChange={changeLoginForm} />
                                <hr />
                                <button type="submit">Log In</button>
                            </form>
                        </div>
                    </div>


                    <div className="register-page">
                        <div className="register">
                            <h1>REGISTER</h1>
                            <form action="" className="login-form">
                                <input className="font" type="text" name="regisName" value={regisName} placeholder={"Name"} onChange={changeRegisterForm} />
                                <hr />
                                <input className="font" type="text" name="regisEmail" value={regisEmail} placeholder={"Email"} onChange={changeRegisterForm} />
                                <hr />
                                <input className="font" type="password" name="regisPass" value={regisPass} placeholder={"Password"} onChange={changeRegisterForm} />
                                <hr />
                                <input className="font" type="password" name="regisCPass" value={regisCPass} placeholder={"Confirm Password"} onChange={changeRegisterForm} />
                                <hr />
                                <h3>register account as A:</h3>
                                <div className="account-as">
                                    <div onClick={setIsUserTrue} className="account-as-btn account-as-btn-coach"><span className="account-as-span account-as-span-coach account-as-span-active"></span><h4>Coach / Student</h4></div>
                                    <div onClick={setIsUserFalse} className="account-as-btn account-as-btn-gym"><span className="account-as-span account-as-span-gym"></span><h4>Gym</h4></div>
                                </div>
                                <button onClick={submitRegisData}>Register</button>
                            </form>
                        </div>
                    </div>

                    <div className="main-texts-info">
                        <h1>THE BEST<br /> WAY TO CONNECT WITH MARTIAL ARTISTS.</h1>
                    </div>
                    <hr className="main-texts-line" />
                    <div className="find" id="find1">
                        <h1><a href="#find-gym" className="gym-txt">LOCATE OTHERS</a></h1>
                        <h1><a href="#martial-arts-page" className="gym-txt">MARTIAL ARTS</a></h1>
                    </div>


                </div>
                <div className="main-image">

                </div>
            </div>
            <tag id="find-gym"></tag>
            <Gym />
            <tag id="martial-arts"></tag>
            <Arts />
        </div>

    )
}

export default Home
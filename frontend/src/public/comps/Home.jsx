import { useState, useEffect } from "react"
import { toast } from "react-toastify"

import { useSelector, useDispatch } from "react-redux"
import { register, login, reset } from "../../features/authentication/authSlice"

import "../css/home.css"

import Arts from "./Arts"
import Gym from "./Gym"

import { useNavigate } from "react-router-dom"

function Home() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { user, isLoading, isError, isSuccess } = useSelector((state) => state.auth)

    if (user || isSuccess) {
        navigate("/userhome")
    }


    const [loginFormData, setLoginFormData] = useState({
        loginEmail: "",
        loginPass: ""
    })

    const [registerFormData, setRegisterFormData] = useState({
        regisName: "",
        regisEmail: "",
        regisPass: "",
        regisCPass: "",

    })


    const { loginEmail, loginPass } = loginFormData

    const { regisName, regisEmail, regisPass, regisCPass } = registerFormData

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

        dispatch(login(userData))
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

        const userData = {
            name: regisName,
            email: regisEmail,
            password: regisPass
        }

        dispatch(register(userData))

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
                            <form action="" onSubmit={submitRegisData} className="login-form">
                                <input className="font" type="text" name="regisName" value={regisName} placeholder={"Name"} onChange={changeRegisterForm} />
                                <hr />
                                <input className="font" type="text" name="regisEmail" value={regisEmail} placeholder={"Email"} onChange={changeRegisterForm} />
                                <hr />
                                <input className="font" type="password" name="regisPass" value={regisPass} placeholder={"Password"} onChange={changeRegisterForm} />
                                <hr />
                                <input className="font" type="password" name="regisCPass" value={regisCPass} placeholder={"Confirm Password"} onChange={changeRegisterForm} />
                                <hr />
                                <button type="submit">Log In</button>
                            </form>
                        </div>
                    </div>



                    <div className="find" id="find1">
                        <h1><a href="#find-gym" className="gym-txt">FIND A GYM</a></h1>
                        <hr className="gym-l" />
                    </div>
                    <div className="find" id="find2">
                        <h1><a href="#martial-arts" className="martialart-txt">FIND MARTIAL ART</a></h1>
                        <hr className="martialart-l" />
                    </div>
                    <div className="find" id="find3">
                        <h1><a href="/" className="coach-txt">FIND A COACH</a></h1>
                        <hr className="coach-l" />
                    </div>
                    <div className="find" id="find4">
                        <h1><a href="/" className="spar-txt">FIND A SPARTNER</a></h1>
                        <hr className="spar-l" />
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
import { useState, useEffect } from "react"
import { toast } from "react-toastify"

import { useSelector, useDispatch } from "react-redux"
import { register, reset } from "../../features/authentication/authSlice"

import "../css/home.css"

import Arts from "../comps/Arts"

function Home() {

    const dispatch = useDispatch()

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

    const submitForm = (e) => {
        e.preventDefault()

        if (loginEmail == "" || loginPass == "") {
            toast.error("Please include both Email and Password Fields.")
        }

        const userData = {
            loginEmail, loginPass
        }
        console.log(userData);
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
            regisName,
            regisEmail,
            regisPass,
            regisCPass
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
                            <form action="" onSubmit={submitForm} className="login-form">
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
                            <h2>REGISTER</h2>
                            <form action="" onSubmit={submitForm} className="login-form">
                                <input className="font" type="text" name="regisName" value={regisName} placeholder={"Name"} onChange={changeRegisterForm} />
                                <hr />
                                <input className="font" type="text" name="regisemail" value={regisEmail} placeholder={"Email"} onChange={changeRegisterForm} />
                                <hr />
                                <input className="font" type="password" name="regispass" value={regisPass} placeholder={"Password"} onChange={changeRegisterForm} />
                                <hr />
                                <input className="font" type="password" name="regiscpass" value={regisCPass} placeholder={"Confirm Password"} onChange={changeRegisterForm} />
                                <hr />
                                <button type="submit">Log In</button>
                            </form>
                        </div>
                    </div>



                    <div className="find" id="find1">
                        <h1><a href="/" className="gym-txt">FIND A GYM</a></h1>
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
            <tag id="martial-arts"></tag>
            <Arts />
        </div>

    )
}

export default Home
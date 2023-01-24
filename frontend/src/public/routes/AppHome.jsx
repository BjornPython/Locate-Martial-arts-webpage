import Home from "../comps/Home"
import React from 'react';
import { useNavigate } from "react-router-dom";
// import AppHomeScript from "../scripts/AppHomeScript";




class AppHome extends React.Component {



    // componentDidMount() {
    //     const script = document.createElement("script");
    //     script.async = true;
    //     script.src = "../scripts/AppHomeScript.js"
    //     document.body.appendChild(script);


    // }


    render() {
        return (
            <div>
                <Home />
            </div>
        )
    }
}


export default AppHome
import { useState } from "react";
import uuid from "react-uuid";

function UdisplayMart({ mart, setFunction, setSpan = false }) {

    const [showSpan, setShowSpan] = useState(setSpan)

    const handleClick = () => {
        setShowSpan(!showSpan)
    }

    return (
        <div className='u-display-mart' onClick={() => { setFunction(mart); handleClick(); }}>
            <span className={`u-mart-span ${showSpan && "u-mart-span-active"}`}></span>
            <h4>{mart}</h4>
        </div>
    )
}

export default UdisplayMart
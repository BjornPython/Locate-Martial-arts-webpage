import { useState } from "react";
import uuid from "react-uuid";

function UdisplayMart({ key, mart, setFunction }) {

    const [showSpan, setShowSpan] = useState(false)

    const handleClick = () => {
        setShowSpan(!showSpan)
    }

    return (
        <div className='u-display-mart' key={key} onClick={() => { setFunction(mart); handleClick(); }}>
            <span className={`u-mart-span ${showSpan && "u-mart-span-active"}`}></span>
            <h4>{mart}</h4>
        </div>
    )
}

export default UdisplayMart
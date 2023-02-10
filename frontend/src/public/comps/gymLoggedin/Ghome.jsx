import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Ghome({ user, userType }) {
    const navigate = useNavigate()
    useEffect(() => {
        if (!user) {
            navigate("/")
        }
    }, [user])

    return (
        <div><h1>GYM HOME</h1></div>
    )
}

export default Ghome
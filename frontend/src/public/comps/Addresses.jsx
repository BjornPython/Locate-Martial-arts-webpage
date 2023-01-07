import React from 'react'

function Addresses({ x, y, label, handleAddressClick }) {
    return (
        <div onClick={() => { handleAddressClick(x, y) }}>
            <h3>{label}</h3>
        </div>
    )
}

export default Addresses
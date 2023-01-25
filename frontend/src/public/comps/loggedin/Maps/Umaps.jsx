import React from 'react'
import UmapForms from './UmapForms'
import UmapBox from './UmapBox'
import "../../../css/loggedin/Umaps/umap.css"

function Umaps() {
    return (
        <div className='u-maps-page'>
            <UmapForms />
            <UmapBox />
        </div>
    )
}

export default Umaps
import React from 'react'
import UmapForms from './UmapForms'
import UmapBox from './UmapBox'
import "../../../css/loggedin/Umaps/umap.css"

function Umaps({ user, info }) {




    return (
        <div className='u-maps-page'>
            <UmapForms />
            <UmapBox info={info} />
        </div>
    )
}

export default Umaps
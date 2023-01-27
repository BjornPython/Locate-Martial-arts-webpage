import React from 'react'

function UsearchResults({ searchResults }) {

    return (
        <div className='u-searchres-div'>
            {searchResults.map((result, index) => {
                return (
                    <h3 key={index}>{result}</h3>
                )
            })}
        </div>
    )
}

export default UsearchResults
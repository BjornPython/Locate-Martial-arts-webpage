import React from 'react'

const ShowResult = ({ result, updateUserInfo }) => {

    return (
        <h3 onClick={() => { updateUserInfo(result.lat, result.long) }}>{result.label}</h3>
    )
}


function UsearchResults({ showSearchResults, searchResults, updateUserInfo }) {


    if (showSearchResults) {
        console.log("SHOW SEARCH RESULTS");
        return (
            <div className='u-searchres-div'>
                {searchResults.map((result, index) => {
                    return (
                        <ShowResult key={index} result={result} updateUserInfo={updateUserInfo}></ShowResult>
                    )
                })}
            </div >
        )
    } else {
        return (
            <>
            </>
        )
    }


}

export default UsearchResults
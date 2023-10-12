'use client';
import React from 'react'

interface Props {
    error: Error;
    reset: () => void;
}

const Error = ({error, reset}: Props) => {
    console.log("ERROR", error)
    return (
        <>
            <div>
                Unexpected Error Has Occurred
            </div>   
            <button className='btn' onClick={() => reset()}>Retry</button>     
        </>

    )
}

export default Error

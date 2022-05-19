import React from 'react'

const SettingsMenu = (props) => {
    return (
        <>
            <div className='col-3 accountMenuTitle'>
                <h1>{props.title}</h1>
            </div>
            <div className='col-8 accountMenuInput'>
                <p>{props.input}</p>
            </div>
            <div className='col-1 edit'>
                <button><i className="bi bi-pencil-square"></i></button>
            </div>
        </>
        
    )
}

export default SettingsMenu
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
        </>
        
    )
}

export default SettingsMenu
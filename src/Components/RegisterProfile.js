import React from 'react'
import { Fade } from 'react-reveal'
import { Link } from 'react-router-dom'

const RegisterProfile = () => {
    return (
        <Fade right>
            <div className='col-6 profile'>
                <h1>Create your profile</h1>
                <div className="form-floating mb-3 form">
                    <input type="text" className="form-control" id="fullname" placeholder="text"/>
                    <label htmlFor="fullname">Name on your Profile</label>
                </div>
                <div className="form-floating mb-3 form">
                    <input type="date" className="form-control" id="birthday" placeholder="date"/>
                    <label htmlFor="birthday">Birthday</label>
                </div>
                <div className='submit'>
                    <Link to="/regprofile"><input type="submit"/></Link>
                </div>
            </div>
        </Fade>
        
    )
}

export default RegisterProfile
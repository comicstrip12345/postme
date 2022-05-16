import React from 'react'
import { Link } from 'react-router-dom'
import { Fade } from 'react-reveal'

const LoginForm = () => {
    return (
        <Fade right>
            <div className='col-6 loginForm'>
                <h1>Sign In</h1>
                <div className="form-floating mb-3 form">
                    <input type="text" className="form-control" id="floatingUsername" placeholder="text"/>
                    <label htmlFor="floatingUsername">Username</label>
                </div>
                <div className="form-floating mb-3 form">
                    <input type="password" className="form-control" id="floatingPassword" placeholder="password"/>
                    <label htmlFor="floatingPassword">Password</label>
                </div>
                <div className='submit'>
                    <div className='row'>
                        <div className='col-3'>
                            <Link to="/"><input type="submit"/></Link>
                        </div>
                        <div className='col-6'>
                            <Link to="/register"><p>New? Sign Up to join.</p></Link>
                        </div>
                    </div>
                    
                    
                </div>
            </div>
        </Fade>
    )
}

export default LoginForm
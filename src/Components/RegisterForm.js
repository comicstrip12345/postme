import React from 'react'

const RegisterForm = () => {
    return (
        <div className='col-6 signUpForm'>
            <h1>Sign Up</h1>
            <div className="form-floating mb-3 form">
                <input type="text" className="form-control" id="floatingName" placeholder="text"/>
                <label for="floatingName">Name</label>
            </div>
            <div className="form-floating mb-3 form">
                <input type="text" className="form-control" id="floatingUsername" placeholder="text"/>
                <label for="floatingUsername">Username</label>
            </div>
            <div className="form-floating mb-3 form">
                <input type="password" className="form-control" id="floatingPassword" placeholder="password"/>
                <label for="floatingPassword">Password</label>
            </div>
            <div className="form-floating mb-3 form">
                <input type="password" className="form-control" id="floatingConfirmPassword" placeholder="password"/>
                <label for="floatingConfirmPassword">Confirm Password</label>
            </div>
            <div className='submit'>
                <input type="submit"/>
            </div>
        </div>
    )
}

export default RegisterForm
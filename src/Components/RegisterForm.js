import React, { useState } from 'react'
import axios from 'axios'

const RegisterForm = () => {
    
    const [usernameReg, setUsernameReg] = useState("")
    const [passwordReg, setPasswordReg] = useState("")
    const [nameReg,setNameReg] = useState("") 

    const register = () => {
        axios.post("http://localhost:3006/register",{
            name:nameReg,
            username:usernameReg,
            password:passwordReg,
        }).then((response)=> {
            console.log(response);
        })
        console.log(`${usernameReg},${passwordReg},${nameReg}`)
        }
    


    return (
        <div className='col-6 signUpForm'>
            <h1>Sign Up</h1>
            <div className="form-floating mb-3 form">
                <input type="text" className="form-control" id="floatingName" placeholder="text" onChange={(e)=>{setNameReg(e.target.value)}}/>
                <label htmlFor="floatingName">Name</label>
            </div>
            <div className="form-floating mb-3 form">
                <input type="text" className="form-control" id="floatingUsername" placeholder="text" onChange={(e)=>{setUsernameReg(e.target.value)}}/>
                <label htmlFor="floatingUsername">Username</label>
            </div>
            <div className="form-floating mb-3 form">
                <input type="password" className="form-control" id="floatingPassword" placeholder="password" onChange={(e)=>{setPasswordReg(e.target.value)}}/>
                <label htmlFor="floatingPassword">Password</label>
            </div>
            <div className="form-floating mb-3 form">
                <input type="password" className="form-control" id="floatingConfirmPassword" placeholder="password"/>
                <label htmlFor="floatingConfirmPassword">Confirm Password</label>
            </div>
            <div className='submit'>
                <input type="submit" onClick={register}/>
            </div>
        </div>
    )
}

export default RegisterForm
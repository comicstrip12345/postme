import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { Fade } from 'react-reveal'

const RegisterForm = () => {
    
    const [usernameReg, setUsernameReg] = useState("")
    const [passwordReg, setPasswordReg] = useState("")
    const [firstNameReg,setFirstNameReg] = useState("") 
    const [lastNameReg,setLastNameReg] = useState("") 
    const [emailReg,setEmailReg] = useState("") 

    let navigate = useNavigate();

    const register = () => {
        axios.post("https://serserserver.herokuapp.com/register",{
            firstName:firstNameReg,
            lastName:lastNameReg,
            username:usernameReg,
            password:passwordReg,
            email:emailReg
        }).then((response)=> {
            console.log(response);
        })
        console.log(`${usernameReg},${passwordReg},${firstNameReg},${lastNameReg},${emailReg}`)

        navigate("/regprofile")
    }


    return (
        <Fade right>

        
        <div className='col-6 signUpForm'>
            <h1>Sign Up</h1>
            <div className='row'>
                <div className="col-4 form-floating mb-3 form">
                    <input type="text" className="form-control" id="floatingFirstName" placeholder="text" onChange={(e)=>{setFirstNameReg(e.target.value)}}/>
                    <label htmlFor="floatingFirstName">First Name</label>
                </div>
                <div className="col-5 form-floating mb-3 form">
                    <input type="text" className="form-control" id="floatingLastName" placeholder="text" onChange={(e)=>{setLastNameReg(e.target.value)}}/>
                    <label htmlFor="floatingLastName">Last Name</label>
                </div>
            </div>
            <div className="form-floating mb-3 form">
                <input type="text" className="form-control" id="email" placeholder="text" onChange={(e)=>{setEmailReg(e.target.value)}}/>
                <label htmlFor="email">Email</label>
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
                <div className='row'>
                    <div className='col-3'>
                        <input type="submit" onClick={register}/>
                    </div>
                    <div className='col-6'>
                        <Link to="/login"><p>Already have an account, then Log In.</p></Link>
                    </div>
                </div>
            </div>
        </div>
        </Fade>
    )
}

export default RegisterForm
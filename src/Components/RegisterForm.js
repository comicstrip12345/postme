import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { Fade } from 'react-reveal'
import 'bootstrap-icons/font/bootstrap-icons.css'
import swal from 'sweetalert'; 

const RegisterForm = () => {
    
    const [usernameReg, setUsernameReg] = useState("")
    const [passwordReg, setPasswordReg] = useState("")
    const [firstNameReg,setFirstNameReg] = useState("") 
    const [lastNameReg,setLastNameReg] = useState("") 
    const [emailReg,setEmailReg] = useState("") 
    const [errorEmailMessage, setErrorEmailMessage] = useState("")
    const [errorUsernameMessage, setErrorUsernameMessage] = useState("")
    const [errorPasswordMessage, setErrorPasswordMessage] = useState("")
    const [errorConfirmPasswordMessage, setErrorConfirmPasswordMessage] = useState("")
    const [errorColor, setErrorColor] = useState("")
    const [errorEmailBorderColor, setErrorEmailBorderColor] = useState("")
    const [errorUsernameBorderColor, setErrorUsernameBorderColor] = useState("")
    const [errorPasswordBorderColor, setErrorPasswordBorderColor] = useState("")
    const [errorConfirmPasswordBorderColor, setErrorConfirmPasswordBorderColor] = useState("")
    const [emailValidity, setEmailValidity] = useState(false)
    const [usernameValidity, setUsernameValidity] = useState(false)
    const [passwordValidity, setPasswordValidity] = useState(false)

    let navigate = useNavigate();
    // eslint-disable-next-line
    let regEx = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
    // eslint-disable-next-line
    let regExPW = /^(?=.*\d).{4,8}$/

    const emailChecker = (e) =>{
        if (!regEx.test(e.target.value)){
            setErrorEmailMessage("Invalid Email")
            setErrorColor("is-invalid")
            setEmailValidity(false)
        }
        else{
            setEmailReg(e.target.value)
            setErrorEmailMessage("")
            setErrorColor("")
            setEmailValidity(true)
            setErrorEmailBorderColor("")
        }
    }
    const usernameChecker = (e)=>{
        if (e.target.value.length < 5){
            setErrorUsernameMessage("Username must be 5 or more characters")
            setErrorColor("is-invalid")
            setUsernameValidity(false)
        }
        else{
            setUsernameReg(e.target.value)
            setErrorUsernameMessage("")
            setErrorColor("")
            setUsernameValidity(true)
            setErrorUsernameBorderColor("")
        }
    }
    const passwordChecker = (e) =>{
        if(!regExPW.test(e.target.value)){
            setErrorPasswordMessage("Password must be 4-8 characters and have at least one numeric digit.")
            setErrorColor("is-invalid")
        }
        else{
            setPasswordReg(e.target.value)
            setErrorPasswordMessage("")
            setErrorColor("")
            setErrorPasswordBorderColor("")
        }
    }
    const confirmpasswordChecker = (e) =>{
        if(passwordReg !== e.target.value){
            setErrorConfirmPasswordMessage("Passwords do not match")
            setErrorColor("is-invalid")
            setPasswordValidity(false)
        }
        else{
            setErrorConfirmPasswordMessage("")
            setErrorColor("")
            setPasswordValidity(true)
            setErrorConfirmPasswordBorderColor("")
        }
    }

    const register = () => {
        
        if(emailValidity === true && usernameValidity === true && passwordValidity === true){
            axios.post("https://serserserver.herokuapp.com/register",{
            firstName:firstNameReg,
            lastName:lastNameReg,
            username:usernameReg,
            password:passwordReg,
            email:emailReg
        }).then((response)=> {
            console.log(response);
            swal("Success", "You have successfully created an account", "success")
        })
            navigate("/regprofile/"+usernameReg)
        }
        else if(emailValidity === true && usernameValidity === true){
            setErrorPasswordBorderColor("red")
            setErrorConfirmPasswordBorderColor("red")
        }
        else if(passwordValidity === true && usernameValidity === true){
            setErrorEmailBorderColor("red")
            setErrorUsernameBorderColor("red")
        }
        else if(usernameValidity === true){
            setErrorPasswordBorderColor("red")
            setErrorConfirmPasswordBorderColor("red")
            setErrorEmailBorderColor("red")
        }
        else if(emailValidity === true){
            setErrorPasswordBorderColor("red")
            setErrorConfirmPasswordBorderColor("red")
            setErrorUsernameBorderColor("red")
        }
        else if(passwordValidity === true){
            setErrorUsernameBorderColor("red")
            setErrorEmailBorderColor("red")
        }
        else{
            console.log("check input");
            setErrorEmailBorderColor("red")
            setErrorUsernameBorderColor("red")
            setErrorPasswordBorderColor("red")
            setErrorConfirmPasswordBorderColor("red")
        }

        
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
            <div className='row'>
                <div className="col-9 form-floating mb-3 form">
                    <input type="text" style={{borderColor: `${errorEmailBorderColor}`}} className={`form-control ${errorColor}`} id="email" placeholder="text" onChange={emailChecker}/>
                    <label htmlFor="email">Email</label>
                </div>
                <div className='col-3 mb-3 errorMessage'>
                <p className='emailError'>{errorEmailMessage}</p>
                </div>
            </div>
            <div className='row'>
                <div className="col-9 form-floating mb-3 form">
                    <input type="text" style={{borderColor: `${errorUsernameBorderColor}`}} className={`form-control ${errorColor}`} id="floatingUsername" placeholder="text" onChange={usernameChecker}/>
                    <label htmlFor="floatingUsername">Username</label>
                </div>
                <div className='col-3 mb-3 errorMessage'>
                    <p className='usernameError'>{errorUsernameMessage}</p>
                </div>
            </div>
            <div className='row'>
                <div className="col-9 form-floating mb-3 form">
                    <input type="password" style={{borderColor: `${errorPasswordBorderColor}`}} className={`form-control ${errorColor}`} id="floatingPassword" placeholder="password" onChange={passwordChecker}/>
                    <label htmlFor="floatingPassword">Password</label>
                </div>
                <div className='col-3 mb-3 errorMessage'>
                    <p className='passwordError'>{errorPasswordMessage}</p>
                </div>
            </div>
            <div className='row'>
                <div className="col-9 form-floating mb-3 form">
                    <input type="password" style={{borderColor: `${errorConfirmPasswordBorderColor}`}} className={`form-control ${errorColor}`} id="floatingConfirmPassword" placeholder="password" onChange={confirmpasswordChecker}/>
                    <label htmlFor="floatingConfirmPassword">Confirm Password</label>
                </div>
                <div className='col-3 mb-3 errorMessage'>
                    <p className='confirmpasswordError'>{errorConfirmPasswordMessage}</p>
                </div>
            </div>
            <div className='submit'>
                <div className='row'>
                    <div className='col-3'>
                        <input type="submit" onClick={register}/>
                    </div>
                    <div className='col-6'>
                        <Link to="/login"><p>Already have an account? Sign in here</p></Link>
                    </div>
                </div>
            </div>
        </div>
        </Fade>
    )
}

export default RegisterForm
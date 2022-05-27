import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { Fade } from 'react-reveal'
import 'bootstrap-icons/font/bootstrap-icons.css'


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
    const [errorInvalidEmailMessage, setErrorInvalidEmailMessage] = useState("")
    const [errorInvalidUsernameMessage, setErrorInvalidUsernameMessage] = useState("")
    const [errorInvalidPasswordMessage, setErrorInvalidPasswordMessage] = useState("")
    const [errorInvalidConfirmPasswordMessage, setErrorInvalidConfirmPasswordMessage] = useState("")
    const [errorEmailBorderColor, setErrorEmailBorderColor] = useState("")
    const [errorUsernameBorderColor, setErrorUsernameBorderColor] = useState("")
    const [errorPasswordBorderColor, setErrorPasswordBorderColor] = useState("")
    const [errorConfirmPasswordBorderColor, setErrorConfirmPasswordBorderColor] = useState("")
    const [emailValidity, setEmailValidity] = useState(false)
    const [usernameValidity, setUsernameValidity] = useState(false)
    const [passwordValidity, setPasswordValidity] = useState(false)
    const [errorDisp,setErrorDisp]=useState(false)
    const [errorPasswordDisp,setErrorPasswordDisp]=useState(false)
    const [errorConfirmPasswordDisp,setErrorConfirmPasswordDisp]=useState(false)
    const [errorUsernameDisp,setErrorUsernameDisp]=useState(false)
    const [invalidEmail,setInvalidEmail] = useState(false)
    const [invalidUsername,setInvalidUsername] = useState(false)
    const [invalidPassword,setInvalidPassword] = useState(false)
    const [invalidConfirmPassword,setInvalidConfirmPassword] = useState(false)

    let navigate = useNavigate();
    // eslint-disable-next-line
    let regEx = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
    // eslint-disable-next-line
    let regExPW = /^(?=.*\d).{4,8}$/

    const emailChecker = (e) =>{
        if(e.target.value===""){
            setErrorDisp(false)
            setInvalidEmail(false)
        }
        else if (!regEx.test(e.target.value)){
            setErrorEmailMessage("Invalid Email")
            setEmailValidity(false)
            setErrorDisp(true)
            setInvalidEmail(false)
        }
        
        else{
            setEmailReg(e.target.value)
            setErrorEmailMessage("")
            setEmailValidity(true)
            setErrorEmailBorderColor("")
            setErrorDisp(false)
        }
    }
    const usernameChecker = (e)=>{
        if(e.target.value===""){
            setErrorUsernameDisp(false)
            setInvalidUsername(false)
        }
        else if (e.target.value.length < 5){
            setErrorUsernameMessage("Username must be 5 or more characters")
            setUsernameValidity(false)
            setErrorUsernameDisp(true)
            setInvalidUsername(false)
        }
        else{
            setUsernameReg(e.target.value)
            setErrorUsernameMessage("")
            setUsernameValidity(true)
            setErrorUsernameBorderColor("")
            setErrorUsernameDisp(false)
        }
    }
    const passwordChecker = (e) =>{
        if(e.target.value===""){
            setErrorPasswordDisp(false)
            setInvalidPassword(false)
        }
        else if(!regExPW.test(e.target.value)){
            setErrorPasswordMessage("Password must be 4-8 characters and have at least one numeric digit.")
            setErrorPasswordDisp(true)
            setInvalidPassword(false)
        }
        else{
            setPasswordReg(e.target.value)
            setErrorPasswordMessage("")
            setErrorPasswordBorderColor("")
            setErrorPasswordDisp(false)
        }
    }
    const confirmpasswordChecker = (e) =>{
        if(e.target.value===""){
            setErrorConfirmPasswordDisp(false)
            setInvalidConfirmPassword(false)
        }
        else if(passwordReg !== e.target.value){
            setErrorConfirmPasswordMessage("Passwords do not match")
            setPasswordValidity(false)
            setErrorConfirmPasswordDisp(true)
            setInvalidConfirmPassword(false)
        }
        else{
            setErrorConfirmPasswordMessage("")
            setPasswordValidity(true)
            setErrorConfirmPasswordBorderColor("")
            setErrorConfirmPasswordDisp(false)
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
            if(response.data.issue==="email"){
                console.log(response)
                setErrorEmailMessage("E-mail is already in use");
                setErrorDisp(true)
                setErrorEmailBorderColor("red")
            }

            else if(response.data.issue==="username"){
                console.log(response)
                setErrorUsernameMessage("Username is already in use");
                setErrorUsernameDisp(true)
                setErrorUsernameBorderColor("red")
            }

            else if (response.status===200){
                navigate("/regprofile/"+usernameReg)
            }
            
        })
           
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
            setInvalidEmail(true)
            setInvalidUsername(true)
            setInvalidPassword(true)
            setInvalidConfirmPassword(true)
            setErrorInvalidEmailMessage("Input Email")
            setErrorInvalidUsernameMessage("Input Username")
            setErrorInvalidPasswordMessage("Input Password")
            setErrorInvalidConfirmPasswordMessage("Input Confirm Password")
        }

        
    }


    return (
        <Fade right>

        
        <div className='col-12 col-xl-6 signUpForm'>
            <h1>Sign Up</h1>
            <div className='row'>
                <div className="col-6 col-xl-4 form-floating mb-3 form">
                    <input type="text" className="form-control" id="floatingFirstName" placeholder="text" onChange={(e)=>{setFirstNameReg(e.target.value)}}/>
                    <label htmlFor="floatingFirstName">First Name</label>
                </div>
                <div className="col-6 col-xl-5 form-floating mb-3 form">
                    <input type="text" className="form-control" id="floatingLastName" placeholder="text" onChange={(e)=>{setLastNameReg(e.target.value)}}/>
                    <label htmlFor="floatingLastName">Last Name</label>
                </div>
            </div>
            <div className='row'>
                <div className="col-12 col-xl-9 form-floating mb-3 form">
                    <input type="text" style={{borderColor: `${errorEmailBorderColor}`}} className={`form-control`} id="email" placeholder="text" onChange={emailChecker}/>
                    <label htmlFor="email">Email</label>
                </div>
                {errorDisp &&
                <div className='col-12 col-xl-3 mb-3 errorMessage'> 
                <p className='emailError'><i className="bi bi-exclamation-triangle-fill"></i> {errorEmailMessage}</p>
                </div>}
                {invalidEmail && 
                <div className='col-12 col-xl-3 mb-3 errorMessage'> 
                <p className='emailError'><i className="bi bi-exclamation-triangle-fill"></i> {errorInvalidEmailMessage}</p>
                </div>}
            </div>
            <div className='row'>
                <div className="col-9 form-floating mb-3 form">
                    <input type="text" style={{borderColor: `${errorUsernameBorderColor}`}} className={`form-control`} id="floatingUsername" placeholder="text" onChange={usernameChecker}/>
                    <label htmlFor="floatingUsername">Username</label>
                </div>
                <div className='col-3 mb-3 errorMessage'>
                    {errorUsernameDisp && <p className='usernameError'><i className="bi bi-exclamation-triangle-fill"></i> {errorUsernameMessage}</p>}
                    {invalidUsername && <p><i className="bi bi-exclamation-triangle-fill"></i> {errorInvalidUsernameMessage}</p>}
                </div>
            </div>
            <div className='row'>
                <div className="col-9 form-floating mb-3 form">
                    <input type="password" style={{borderColor: `${errorPasswordBorderColor}`}} className={`form-control`} id="floatingPassword" placeholder="password" onChange={passwordChecker}/>
                    <label htmlFor="floatingPassword">Password</label>
                </div>
                <div className='col-3 mb-3 errorMessage'>
                    {errorPasswordDisp && <p className='passwordError'><i className="bi bi-exclamation-triangle-fill"></i> {errorPasswordMessage}</p>}
                    {invalidPassword && <p><i className="bi bi-exclamation-triangle-fill"></i> {errorInvalidPasswordMessage}</p>}
                </div>
            </div>
            <div className='row'>
                <div className="col-9 form-floating mb-3 form">
                    <input type="password" style={{borderColor: `${errorConfirmPasswordBorderColor}`}} className={`form-control`} id="floatingConfirmPassword" placeholder="password" onChange={confirmpasswordChecker}/>
                    <label htmlFor="floatingConfirmPassword">Confirm Password</label>
                </div>
                <div className='col-3 mb-3 errorMessage'>
                    {errorConfirmPasswordDisp && <p className='confirmpasswordError'><i className="bi bi-exclamation-triangle-fill"></i> {errorConfirmPasswordMessage}</p>}
                    {invalidConfirmPassword && <p className='confirmpasswordError'><i className="bi bi-exclamation-triangle-fill"></i> {errorInvalidConfirmPasswordMessage}</p>}
                </div>
            </div>
            <div className='submit'>
                <div className='row'>
                    <div className='col-3'>
                        <input type="submit" onClick={register}/>
                    </div>
                    <div className='col-6'>
                        <p>Already have an account? <Link to="/login">Sign in</Link> here</p>
                    </div>
                </div>
            </div>
        </div>
        </Fade>
    )
}

export default RegisterForm
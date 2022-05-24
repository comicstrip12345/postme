import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Fade } from 'react-reveal'
import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.css'
import swal from 'sweetalert'; 

const LoginForm = () => {
    const [usernameLogin, setUsernameLogin] = useState("")
    const [passwordLogin, setPasswordLogin] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [errorDisp,setErrorDisp]=useState(false)

    let navigate = useNavigate();

    const login = () => {
       
        axios.post("https://serserserver.herokuapp.com/login", {
            username:usernameLogin,
            password:passwordLogin,
        }).then((response)=> {

            console.log(response)
            if(response.status===200){
                setErrorMessage("success")
                const id = response["data"]["array"]["0"]["userid"];
                setErrorDisp(false)
                swal("Success", "You have successfully logged in", "success"); 
                navigate(`/homepage/${id}`)
            } 
        }).catch((err) =>  {
            console.log(err)

            if(err.response.status===400){
                setErrorDisp(true)
                setErrorMessage("Please input username and/or password")
            }

            else if(err.response.status===401){
                setErrorDisp(true)
                setErrorMessage("Invalid username and/or password")
            }
        })
       

      
    }

    

    return (
        <Fade right>
            <div className='col-6 loginForm'>
                <h1>Sign In</h1>
                <div className="form-floating mb-3 form">
                    <input type="text" className="form-control" id="floatingUsername" placeholder="text" onChange={(e)=> setUsernameLogin(e.target.value)}/>
                    <label htmlFor="floatingUsername">Username</label>
                </div>
                <div className="form-floating mb-3 form">
                    <input type="password" className="form-control" id="floatingPassword" placeholder="password" onChange={(e)=> setPasswordLogin(e.target.value)}/>
                    <label htmlFor="floatingPassword">Password</label>
                </div>
                <div className='submit'>
                    <div className='row'>
                        <div className='col-3'>
                            <input type="submit" onClick={login}/>
                        </div>
                        <div className='col-6'>
                            <p>New to postme? <Link to="/register">Sign Up</Link> to join.</p>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-12 errorMessage'>
                        {errorDisp &&  <p style={{backgroundColor:"red"}}><i className="bi bi-exclamation-triangle-fill"></i> {errorMessage}</p> }
                       
                    </div>
                </div>
            </div>
        </Fade>
    )
}

export default LoginForm
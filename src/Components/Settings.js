import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import NavbarLoggedIn from './NavbarLoggedIn'
import SettingsMenu from './SettingsMenu'
import 'bootstrap-icons/font/bootstrap-icons.css'

const Settings = () => {
    const {userid} = useParams();
    const [axiosResult, setAxiosResult]=useState([])
    const [editingEmailMode, setEditingEmailMode]=useState(false)
    const [editingUsernameMode, setEditingUsernameMode]=useState(false)
    const [editingPasswordMode, setEditingPasswordMode]=useState(false)
    const [formInput,setFormInput] = useState({
        email:"",
        username:"",
        password:""
    });

    const handleInput = (e) => {
        e.preventDefault()
        setFormInput({...formInput,[
            e.target.name
        ]:e.target.value})
    }
    useEffect(
        ()=> {
            axios.post("https://serserserver.herokuapp.com/profile", {userid:userid}).then((res)=> {
                    if(res.status===200){
                        console.log(res)
                        setAxiosResult(res["data"]["array"][0])
                    }
                })
        },[editingEmailMode,editingUsernameMode,userid])

    const editEmailHandler = () => {
        setEditingEmailMode(true)
    }
    const editUsernameHandler = () => {
        setEditingUsernameMode(true)
    }
    const editPasswordHandler = () => {
        setEditingPasswordMode(true)
    }
    const doneEditEmailHandler = () => {
        setEditingEmailMode(false)
    }
    const doneEditUsernameHandler = () => {
        setEditingUsernameMode(false)
    }
    const doneEditPasswordHandler = () => {
        setEditingPasswordMode(false)
    }

    const saveEmailHandler = (e) => {
        e.preventDefault()
        const data = {
            email:formInput.email,
            userid:userid
        }    
        console.log(data)
        axios.post("https://serserserver.herokuapp.com/editemail", data ).then((res)=> {
                if(res.status===200){
                    console.log(res)
                    doneEditEmailHandler()
                }
        }) 
    }

    const saveUsernameHandler = (e) => {
        e.preventDefault()
        const data = {
            username:formInput.username,
            userid:userid
        }    
        console.log(data)
        axios.post("https://serserserver.herokuapp.com/editusername", data ).then((res)=> {
                if(res.status===200){
                    console.log(res)
                    doneEditUsernameHandler()
                }
        }) 
    }
        
    const savePasswordHandler = (e) => {
        e.preventDefault()
        const data = {
            password:formInput.password,
            userid:userid
        }    
        console.log(data)
        axios.post("https://serserserver.herokuapp.com/editpassword", data ).then((res)=> {
                if(res.status===200){
                    console.log(res)
                    doneEditPasswordHandler()
                }
        }) 
    }
        
    
    return (
        <>
            <NavbarLoggedIn
                link={userid}
            />
            <section className='settings'>
                <div className='container'>
                    <div className='row pt-5'>
                        <div className='col-12 title'>
                            <h1>Account Settings</h1>
                        </div>
                        <div className='col-12 account'>
                            <div className='row'>
                                {!editingEmailMode?
                                    <>
                                        <SettingsMenu
                                            title="Email:"
                                            input={axiosResult.email}
                                        />
                                        </>:
                                    <>
                                        <div className='col-3 accountMenuEdit'>
                                            <h1>Email:</h1>
                                        </div>
                                        <div className="col-4 form">
                                            <input type="text" className="form-control" id="post" name="email" placeholder={axiosResult.email} onChange={handleInput}/>
                                        </div>
                                    </>
                                }
                                {!editingEmailMode?
                                        <div className='col-1 edit'>
                                            <button onClick={editEmailHandler}><i className="bi bi-pencil-square"></i></button>
                                        </div>:
                                        <div className='col-5 edit'>
                                            <button onClick={saveEmailHandler}><i class="bi bi-check-lg green"></i></button>
                                            <button onClick={doneEditEmailHandler}><i class="bi bi-x-lg red"></i></button>
                                        </div>
                                }         
                                {!editingUsernameMode?
                                    <>
                                        <SettingsMenu
                                            title="Username:"
                                            input={axiosResult.username}
                                        />
                                    </>:
                                    <>
                                        <div className='col-3 accountMenuEdit'>
                                            <h1>Username:</h1>
                                        </div>
                                        <div className="col-4 form">
                                            <input type="text" className="form-control" id="post" name="username" placeholder={axiosResult.username} onChange={handleInput}/>
                                        </div>
                                    </>
                                }
                                {!editingUsernameMode?
                                        <div className='col-1 edit'>
                                            <button onClick={editUsernameHandler}><i className="bi bi-pencil-square"></i></button>
                                        </div>:
                                        <div className='col-5 edit'>
                                            <button onClick={saveUsernameHandler}><i class="bi bi-check-lg green"></i></button>
                                            <button onClick={doneEditUsernameHandler}><i class="bi bi-x-lg red"></i></button>
                                        </div>
                                }    
                                {!editingPasswordMode?
                                    <>
                                        <SettingsMenu
                                            title="Password:"
                                            input="*******"
                                        />
                                    </>:
                                    <>
                                        <div className='col-3 accountMenuEdit'>
                                            <h1>Password:</h1>
                                        </div>
                                        <div className="col-4 form">
                                            <input type="password" className="form-control"  name="password" id="post"  onChange={handleInput}/>
                                        </div>
                                    </>
                                }
                                {!editingPasswordMode?
                                        <div className='col-1 edit'>
                                            <button onClick={editPasswordHandler}><i className="bi bi-pencil-square"></i></button>
                                        </div>:
                                        <div className='col-5 edit'>
                                            <button onClick={savePasswordHandler}><i class="bi bi-check-lg green"></i></button>
                                            <button onClick={doneEditPasswordHandler}><i class="bi bi-x-lg red"></i></button>
                                        </div>
                                }    
                                     
                                        
                                    
                                
                                <div className='col-12 delete'>
                                    <button><p>Delete Account</p></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Settings
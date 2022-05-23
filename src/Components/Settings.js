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
        })

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
    const saveEditHandler = (e) => {
        e.preventDefault()
        const data = {
            email:formInput.email,
            username:formInput.username
        }    
        console.log(data)
        axios.post("https://serserserver.herokuapp.com/editprofile", data ).then((res)=> {
                if(res.status===200){
                    console.log(res)
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
                                            <button onClick={saveEditHandler}><i class="bi bi-check-lg green"></i></button>
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
                                            <input type="text" className="form-control" id="post" placeholder={axiosResult.username} onChange={handleInput}/>
                                        </div>
                                    </>
                                }
                                {!editingUsernameMode?
                                        <div className='col-1 edit'>
                                            <button onClick={editUsernameHandler}><i className="bi bi-pencil-square"></i></button>
                                        </div>:
                                        <div className='col-5 edit'>
                                            <button onClick={saveEditHandler}><i class="bi bi-check-lg green"></i></button>
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
                                            <input type="text" className="form-control" id="post" placeholder={axiosResult.password} onChange={handleInput}/>
                                        </div>
                                    </>
                                }
                                {!editingPasswordMode?
                                        <div className='col-1 edit'>
                                            <button onClick={editPasswordHandler}><i className="bi bi-pencil-square"></i></button>
                                        </div>:
                                        <div className='col-5 edit'>
                                            <button onClick={saveEditHandler}><i class="bi bi-check-lg green"></i></button>
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
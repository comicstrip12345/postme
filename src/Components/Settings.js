import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import NavbarLoggedIn from './NavbarLoggedIn'
import SettingsMenu from './SettingsMenu'
import 'bootstrap-icons/font/bootstrap-icons.css'

const Settings = () => {
    const {userid} = useParams();
    const [axiosResult, setAxiosResult]=useState([])
    useEffect(
        ()=> {
            axios.post("https://serserserver.herokuapp.com/profile", {userid:userid}).then((res)=> {
                    if(res.status===200){
                        console.log(res)
                        setAxiosResult(res["data"]["array"][0])
                    }
               
                })
        },[userid])
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
                                <SettingsMenu
                                    title="Email:"
                                    input={axiosResult.email}
                                />
                                <SettingsMenu
                                    title="Username:"
                                    input={axiosResult.username}
                                />
                                <SettingsMenu
                                    title="Password:"
                                    input="*******"
                                />
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
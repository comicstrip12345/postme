import React, {useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import NavbarLoggedIn from './NavbarLoggedIn'
import SettingsMenu from './SettingsMenu'
import 'bootstrap-icons/font/bootstrap-icons.css'

const Settings = () => {
    const {userid} = useParams()
    useEffect(
        ()=> {
            axios.post("https://serserserver.herokuapp.com/profile", {userid:userid})
        })
    return (
        <>
            <NavbarLoggedIn
                link={userid}
            />
            <section className='settings'>
                <div className='container'>
                    <div className='row pt-4'>
                        <div className='col-12 title'>
                            <h1>Account Settings</h1>
                        </div>
                        <div className='col-12 account'>
                            <div className='row'>
                                <SettingsMenu
                                    title="Email:"
                                    input="example@gmail.com"
                                />
                                <SettingsMenu
                                    title="Username:"
                                    input="hello"
                                />
                                <SettingsMenu
                                    title="Password:"
                                    input="hello"
                                />
                                <div className='col-12 delete'>
                                    <button>Delete Account</button>
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
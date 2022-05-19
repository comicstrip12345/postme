import React from 'react'
import NavbarLoggedIn from './NavbarLoggedIn'
import 'bootstrap-icons/font/bootstrap-icons.css'

const Settings = () => {
    return (
        <>
            <NavbarLoggedIn/>
            <section className='settings'>
                <div className='container'>
                    <div className='row pt-4'>
                        <div className='col-12 title'>
                            <h1>Account Settings</h1>
                        </div>
                        <div className='col-12 account'>
                            <div className='row'>
                                <div className='col-3 userHead'>
                                    <h1>Username:</h1>
                                </div>
                                <div className='col-8 username'>
                                    <p>casdnadjna</p>
                                </div>
                                <div className='col-1 edit'>
                                    <button><i class="bi bi-pencil-square"></i></button>
                                </div>
                                <div className='col-3 passHead'>
                                    <h1>Password:</h1>
                                </div>
                                <div className='col-8 password'>
                                    <p>Password:</p>
                                </div>
                                <div className='col-1 edit'>
                                <button><i class="bi bi-pencil-square"></i></button>
                                </div>
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
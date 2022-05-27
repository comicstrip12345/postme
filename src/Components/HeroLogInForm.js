import React from 'react'
import LoginForm from './LoginForm'
import NavbarNotLoggedIn from './NavbarNotLoggedIn'
import Footer from './Footer'


const HeroLogInForm = () => {
    return (
        <>
            <NavbarNotLoggedIn/>
            <section className='hero'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-sm-6 friendPhoto'>
                            <img src={require("../images/fun-friends.png")} alt="friends"/>
                        </div>
                        <LoginForm/>
                    </div>
                </div>
            </section>
            <Footer/>
        </>
        
    )
}

export default HeroLogInForm
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
                        <div className='col-6 tagLine'>
                            <p>Connect your loved ones with just one click.</p>
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
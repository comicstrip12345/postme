import React from 'react'
import RegisterForm from './RegisterForm'
import NavbarNotLoggedIn from './NavbarNotLoggedIn'
import Footer from './Footer'


const HeroRegisterForm = () => {
    return (
        <>  
            <NavbarNotLoggedIn/>
            <section className='hero'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-xl-6 friendPhoto'>
                        <img src={require("../images/fun-friends.png")} alt="friends"/>
                        </div>
                        <RegisterForm/>
                    </div>
                </div>
            </section>
            <Footer/>
        </>
        
    )
}

export default HeroRegisterForm
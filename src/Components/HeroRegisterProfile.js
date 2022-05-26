import React from 'react'
import RegisterProfile from './RegisterProfile'
import NavbarNotLoggedIn from './NavbarNotLoggedIn'
import Footer from './Footer'


const HeroRegisterProfile = () => {
    return (
        <>
            <NavbarNotLoggedIn/>
            <section className='hero'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-6 tagLine'>
                            <p>Connect your loved ones with just one click.</p>
                        </div>
                        <RegisterProfile/>
                    </div>
                </div>
            </section>
            <Footer/>
        </>
        
    )
}

export default HeroRegisterProfile
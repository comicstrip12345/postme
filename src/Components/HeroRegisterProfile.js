import React from 'react'
import RegisterProfile from './RegisterProfile'
import NavbarForm from './NavbarForm'
import Footer from './Footer'


const HeroRegisterProfile = () => {
    return (
        <>
            <NavbarForm/>
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
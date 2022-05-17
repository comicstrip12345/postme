import React from 'react'
import RegisterForm from './RegisterForm'
import NavbarForm from './NavbarForm'
import Footer from './Footer'


const HeroRegisterForm = () => {
    return (
        <>  
            <NavbarForm/>
            <section className='hero'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-6 tagLine'>
                            <p>Connect your loved ones with just one click.</p>
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
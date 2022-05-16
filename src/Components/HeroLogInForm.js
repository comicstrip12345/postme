import React from 'react'
import LoginForm from './LoginForm'
import NavbarForm from './NavbarForm'

const HeroLogInForm = () => {
    return (
        <>
            <NavbarForm/>
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
        </>
        
    )
}

export default HeroLogInForm
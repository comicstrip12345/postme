import React from 'react'
import NavbarNotLoggedIn from './NavbarNotLoggedIn'
import { Link } from 'react-router-dom'

const Hero = () => {
    return (
        <>  
            <NavbarNotLoggedIn/>
            <section className='hero'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-6 tagLine'>
                            <p>Connect your loved ones with just one click.</p>
                            <Link to="/login"><input type="submit"value="Sign In"/></Link>
                            <Link to="/register"><input type="submit"value="Sign Up"/></Link>
                        </div>
                        <div className='col-6 gif'>
                            <img src={require('../images/postme.gif')} alt='gif'/>
                        </div>
                    </div>
                </div>
            </section>
        </>
        
    )
}

export default Hero
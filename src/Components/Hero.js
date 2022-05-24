import React from 'react'
import NavbarNotLoggedIn from './NavbarNotLoggedIn'
import Footer from './Footer'
import { Link } from 'react-router-dom'
import Fade from 'react-reveal/Fade';

const Hero = () => {
    return (
        <>  
            <NavbarNotLoggedIn/>
            <section className='hero'>
                <div className='container'>
                    <div className='row'>
                        <Fade top>
                        <div className='col-12 col-sm-6 col-md-12 col-lg-6 tagLine'>
                            <p>Connect your loved ones with just one click.</p>
                            <Link to="/login"><input type="submit"value="Sign In"/></Link>
                            <Link to="/register"><input className='margin' type="submit"value="Sign Up"/></Link>
                        </div>
                        </Fade>
                        <div className='col-sm-6 gif'>
                            <img src={require('../images/postme.gif')} alt='gif'/>
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>
        </>
        
    )
}

export default Hero
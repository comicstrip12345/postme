import React from 'react'
import NavbarNotLoggedIn from './NavbarNotLoggedIn'
import Footer from './Footer'
import { Link } from 'react-router-dom'

const NotFound404 = () => {
    return (
        <>
          <NavbarNotLoggedIn/>
          <section className='error404'>
            <div className='container'>
              <div className='row'>
                <div className='col-6 image'>
                  <img src={require("../images/404.png")} alt="404"/>
                </div>
                <div className='col-6 warning d-flex align-items-center'>
                  <div className='row'>
                    <div className='col-12 title'>
                      <h1>Page Not Found.</h1>
                    </div>
                    <div className='col-12 content'>
                      <p>You don't belong here. Go back to where you came from.</p>
                    </div>
                    <div className='col-12 button'>
                      <Link to="/"><button>Home</button></Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <Footer/>
        </>
        
    )
}

export default NotFound404
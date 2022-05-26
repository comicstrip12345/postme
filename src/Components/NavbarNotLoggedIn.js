import React from 'react'
import { Link } from 'react-router-dom'

const NavbarNotLoggedIn = () => {
    return (
        <nav>
            <div className='container home'>
                <p><Link to="/">postme</Link></p>
            </div>
        </nav>
    )
}

export default NavbarNotLoggedIn
import React from 'react'
import { Link } from 'react-router-dom'

const NavbarForm = () => {
    return (
        <nav>
            <div className='container forms'>
                <p><Link to="/">postme</Link></p>
            </div>
        </nav>
    )
}

export default NavbarForm
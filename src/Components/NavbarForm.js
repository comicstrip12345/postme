import React from 'react'
import { Link } from 'react-router-dom'

const NavbarForm = () => {
    return (
        <nav>
            <div className='container forms'>
                <Link to="/"><p>postme</p></Link>
            </div>
        </nav>
    )
}

export default NavbarForm
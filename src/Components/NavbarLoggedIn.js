import React from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'

const NavbarLoggedIn = () => {
    return (
        <nav className='navbar loggedIn'>
            <div className='container'>
                <p>postme</p>
                <nav className='nav'>
                    <a href=''><i className="bi bi-search"></i></a>
                    <a className='' href='#/' role="button" id="profileSettings" data-bs-toggle="dropdown" aria-expanded="false">
                        <div className='navImageCircle'>
                        </div>
                    </a>
                    
                    <ul className='dropdown-menu dropdown-menu-end profSettingsDropdown' aria-labelledby='profileSettings'>
                        <li><a href="#/" className="dropdown-item">Your Profile</a></li>
                        <li><a href="#/" className="dropdown-item">Settings</a></li>
                        <li><a href="#/" className="dropdown-item">Logout</a></li>
                    </ul>
                </nav>
            </div>
        </nav>
    )
}

export default NavbarLoggedIn
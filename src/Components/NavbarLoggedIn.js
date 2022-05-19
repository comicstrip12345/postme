import React from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { Link } from 'react-router-dom'

const NavbarLoggedIn = (props) => {
    return (
        <nav className='navbar loggedIn'>
            <div className='container'>
                <p>postme</p>
                <nav className='nav'>
                    <Link to={`/searchpage/${props.link}`}><i className="bi bi-search"></i></Link>
                    <Link to=""><i class="bi bi-bell"></i></Link>
                    <a className='' href='#/' role="button" id="profileSettings" data-bs-toggle="dropdown" aria-expanded="false">
                        <div className='navImageCircle'>
                        </div>
                    </a>
                    
                    <ul className='dropdown-menu dropdown-menu-end profSettingsDropdown' aria-labelledby='profileSettings'>
                        <li><Link to={`/profile/${props.link}`} className="dropdown-item">Your Profile</Link></li>
                        <li><Link to={`/friendrequests/${props.link}`} className="dropdown-item">Friend Requests</Link></li>
                        <li><Link to={`/settings/${props.link}`} className="dropdown-item">Settings</Link></li>
                        <li><Link to={""} className="dropdown-item">Logout</Link></li>
                    </ul>
                </nav>
            </div>
        </nav>
    )
}

export default NavbarLoggedIn
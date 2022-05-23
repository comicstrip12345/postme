import React, { useEffect, useState } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { Link } from 'react-router-dom'
import axios from 'axios';

const NavbarLoggedIn = (props) => {
    
    const [notif,setNotifs] = useState([]);
    const userid=props.link

    useEffect(()=>{
        axios
        .post("https://serserserver.herokuapp.com/notiffeed")
        .then((response) => {
            console.log(response)
            setNotifs(response["data"]["array"])
        });
  
    },[])

    // eslint-disable-next-line
    const postnotifs = notif.filter(item => item.notiftype === 'post' && item.new_comment ==='1' && item.wallid==userid );

     // eslint-disable-next-line
    const commentnotifs = notif.filter(item => item.notiftype === 'comment' && item.new_comment ==='1' && item.wallid==userid );
    const notifcount = postnotifs.length + commentnotifs.length;


    return (
        <nav className='navbar loggedIn'>
            <div className='container'>
                <p>postme</p>
                <nav className='nav'>
                    <Link to={`/searchpage/${props.link}`}><i className="bi bi-search"></i></Link>
                    <Link to={`/notifications/${props.link}`}><i className="bi bi-bell"></i> <span  style={{color:'white',fontSize:'15px'}}>{notifcount}</span></Link>
                    <a className='' href='/#' role="button" id="profileSettings" data-bs-toggle="dropdown" aria-expanded="false">
                        <div className='navImageCircle'>
                        </div>
                    </a>
                    
                    <ul className='dropdown-menu dropdown-menu-end profSettingsDropdown' aria-labelledby='profileSettings'>
                        <li><Link to={`/profile/${props.link}`} className="dropdown-item"><i className="bi bi-person-fill"></i>Your Profile</Link></li>
                        <li><Link to={`/friendrequests/${props.link}`} className="dropdown-item"><i className="bi bi-person-plus-fill"></i>Friend Requests</Link></li>
                        <li><Link to={`/settings/${props.link}`} className="dropdown-item"><i className="bi bi-gear-fill"></i>Settings</Link></li>
                        <li><Link to={"/"} className="dropdown-item"><i className="bi bi-person-plus-fill"></i>Logout</Link></li>
                    </ul>
                </nav>
            </div>
        </nav>
    )
}

export default NavbarLoggedIn
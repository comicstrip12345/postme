import React, { useEffect, useState } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { Link } from 'react-router-dom'
import axios from 'axios';
import swal from 'sweetalert'; 


const NavbarLoggedIn = (props) => {
    
    const [notif,setNotifs] = useState([]);
    const userid=props.link
    const [profile, setProfile] = useState([]);
    const [notifFetcher,setNotifFetcher]=useState(1)

    useEffect(()=>{
        axios
        .post("https://serserserver.herokuapp.com/notiffeed")
        .then((response) => {
            console.log(response)
            setNotifs(response["data"]["array"])
        });

        axios.post("https://serserserver.herokuapp.com/profile", {userid:userid} ).then((res)=> {
                    if(res.status===200){
                        const id = res["data"]["array"][0]
                        setProfile(id)
                    }
                }) 
                
    },[userid,notifFetcher])

   
    setTimeout(() => {
        setNotifFetcher(notifFetcher+1)
    }, 15000)

   

    const logoutswal = () => {
        swal("Logged out", "We will miss you!", "info"); 
    }

    // eslint-disable-next-line
    const postnotifs = notif.filter(item => item.notiftype === 'post' && item.new_comment ==='1' && item.wallid==userid );

     // eslint-disable-next-line
    const friendnotifs = notif.filter(item => item.notiftype === 'friends' && item.new_comment ==='1' && item.notifreceiverid==userid );

     // eslint-disable-next-line
    const commentnotifs = notif.filter(item => item.notiftype === 'comment' && item.new_comment ==='1' && item.wallid==userid );
    const notifcount = postnotifs.length + commentnotifs.length +friendnotifs.length;

    



    return (
        <nav className='navbar loggedIn sticky-top'>
            <div className='container'>
            <Link to={`/homepage/${props.link}`}><p>postme</p></Link>
                <nav className='nav'>
                    <Link to={`/searchpage/${props.link}`}><i className="bi bi-search"></i></Link>
                    <Link to={`/notifications/${props.link}`}><i className="bi bi-bell"></i> <span  style={{color:'white',fontSize:'15px'}}>{notifcount}</span></Link>
                    <a className='' href='/#' role="button" id="profileSettings" data-bs-toggle="dropdown" aria-expanded="false">
                        <div className='navImageCircle'>
                            <img src={profile.picpath} onError={(event) => event.target.src = 'https://eng.asu.edu.eg/img/user.png'}  alt="avatar" style={{width:"33px",height:"33px",objectFit:"cover",borderRadius:"500px"}}/>
                        </div>
                    </a>
                    
                    <ul className='dropdown-menu dropdown-menu-end profSettingsDropdown' aria-labelledby='profileSettings'>
                        <li><Link to={`/profile/${props.link}`} className="dropdown-item"><i className="bi bi-person-fill"></i>Your Profile</Link></li>
                        <li><Link to={`/friendslist/${props.link}`} className="dropdown-item"><i className="bi bi-people-fill"></i>Friends List</Link></li>
                        <li><Link to={`/friendrequests/${props.link}`} className="dropdown-item"><i className="bi bi-person-plus-fill"></i>Friend Requests</Link></li>
                        <li><Link to={`/settings/${props.link}`} className="dropdown-item"><i className="bi bi-gear-fill"></i>Settings</Link></li>
                        <li><Link to={"/login"} className="dropdown-item" onClick={logoutswal}><i className="bi bi-person-plus-fill"></i>Logout</Link></li>
                    </ul>
                </nav>
            </div>
        </nav>
    )
}

export default NavbarLoggedIn
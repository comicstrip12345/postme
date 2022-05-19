import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import NavbarLoggedIn from './NavbarLoggedIn';
import { Fade } from 'react-reveal';
import 'bootstrap-icons/font/bootstrap-icons.css'

const FriendRequests = () => {
    const {userid} = useParams();

    const [profiles, setProfiles] = useState([]);
    
    useEffect(
        ()=> {
            console.log(userid)
            axios.post("https://serserserver.herokuapp.com/friendrequestpage", {
                userid:userid
            }).then((res)=> {
                if(res.status===200){
                    console.log(res)
                    setProfiles(res["data"]["array"])
                }
            })
        },
        []
    )

    return (
        <>
            <NavbarLoggedIn/>
            <section className='friendRequests'>
                <div className='container'>
                    <div className='row pt-4'>
                        <div className='col-12 title'>
                            <h1>Friend Requests</h1>    
                        </div>
                        {profiles.map((profile,index)=> (
                        <Fade>
                            <div className='col-4 friendsProfile' key={index}>
                                <div className='row'>
                                    <div className='col-3 friendsImage'>
                                        {/* container ng image sa future */}
                                        <img src="https://e7.pngegg.com/pngimages/505/761/png-clipart-login-computer-icons-avatar-icon-monochrome-black-thumbnail.png" alt="avatar"/>
                                    </div>
                                    <div className='col-9 d-flex align-items-center friendsDetail'>
                                        <h1>
                                            {profile.firstName} {profile.lastName} <br/>
                                            <small className='text-muted'>from {profile.city}</small> <br/>
                                            <button><i class="bi bi-check-lg green"></i></button>
                                            <button><i class="bi bi-x-lg red"></i></button>
                                        </h1>
                                       
                                    </div>
                                </div>
                            </div>
                        </Fade>
                    ))}
                    </div>
                    
                    
                </div>
            </section>
        </>
    )
}

export default FriendRequests
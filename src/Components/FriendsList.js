import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NavbarLoggedIn from './NavbarLoggedIn'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { Link } from 'react-router-dom';
import { Fade } from 'react-reveal';

const FriendsList = () => {

    const {userid} = useParams();
    const [friends,setFriends] = useState([]);

    useEffect(() => {
        axios.post("https://serserserver.herokuapp.com/flfeed",{
             userid:userid,
        }).then((response)=> {
            console.log(response);
            setFriends(response["data"]["array"])
        })
      
    }, [userid])
    

    return (
        <>
            <NavbarLoggedIn
                link={userid}
            />
            <section className='searchPage'>
                <div className='container'>
                    <div className='row pt-5'>
                        {friends.map((profile,index)=> (
                                <Fade key={index}>
                                    <div className='col-4' >
                                        <div className='row searchTile'>
                                            <div className='col-3 image'>
                                                {/* container ng image sa future */}
                                                <img src={profile.picpath} onError={(event) => event.target.src = 'https://eng.asu.edu.eg/img/user.png'}  alt="avatar" style={{width:"100px",height:"100px",objectFit:"cover",borderRadius:"500px"}}/>
                                            </div>
                                            <div className='col-9 detail d-flex align-items-center'>
                                                <h1>
                                                    <Link to={`/profile/${userid}/${profile.friendid}`}>{profile.firstName} {profile.lastName}<br/>
                                                    <small className='text-muted'> {profile.city} </small> <br />
                                                    <small className='text-muted'> {profile.nickname} </small> <br />
                                                    <small className='text-muted'> {profile.birthday} </small> <br />
                                                    </Link> 
                                                </h1>
                                            </div>
                                        </div>
                                    </div>
                                </Fade>
                            ))
                        }
                    </div>
                </div>
            </section>
            
        </>
        
    )
}

export default FriendsList
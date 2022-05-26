import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import NavbarLoggedIn from './NavbarLoggedIn';
import { Fade } from 'react-reveal';
import 'bootstrap-icons/font/bootstrap-icons.css'
import swal from 'sweetalert'; 

const FriendRequests = () => {
    const {userid} = useParams();

    const [profiles, setProfiles] = useState([]);
    const [pageUpdater, setPageUpdater]=useState(1)
    const [noFr, setNoFr]=useState(false)
    
    useEffect(
        ()=> {
            console.log(userid)
            axios.post("https://serserserver.herokuapp.com/friendrequestpage", {
                userid:userid
            }).then((res)=> {
                if (res["data"]["array"].length===0){
                    setNoFr("No Friend Requests")
                }
                else{
                    console.log(res)
                    setProfiles(res["data"]["array"])
                }
            })
        },
        [userid,pageUpdater]
    )

    const delRequestHandler = (e) => {
        const requestid = e.target.id
        console.log(requestid)

        axios.post("https://serserserver.herokuapp.com/deleterequest", {
            requestid:requestid
        }).then((res)=> {
            if(res.status===200){
                console.log(res)
                swal("Request rejected", "You have rejected this user's friend request", "info"); 
                setPageUpdater(pageUpdater+1)
            }
        })
    }

    const acceptRequestHandler = (e) => {
        const friendid = e.target.id
        console.log(`${friendid} ${userid}`)

        axios.post("https://serserserver.herokuapp.com/addfriend", {
            userid:userid,
            friendid:friendid

        }).then((res)=> {
            if(res.status===200){
                swal("Added", "You are now friends", "success"); 
                setPageUpdater(pageUpdater+1)
                
            }
        })
    }

    return (
        <>
            <NavbarLoggedIn
                link={userid}
            />
            <section className='friendRequests'>
                <div className='container'>
                    <div className='row pt-5'>
                        <div className='col-12 title'>
                            <h1>Friend Requests</h1>
                            <div className='row'>
                            {noFr && 
                            <>
                                <div className='col-6 noFriendRequest'>
                                <img src={require("../images/friends.png")} alt="friend-request"/>
                                </div>
                                <div className='col-6 noFriendRequestContent d-flex align-items-center'>
                                    <p>You have no friend requests. Just wait.</p>
                                </div>
                            </>
                            }
                            {profiles.map((profile,index)=> (
                            <Fade key={index}>
                                <div className='col-4 friendsProfile'>
                                    <div className='row'>
                                        <div className='col-3 friendsImage'>
                                            {/* container ng image sa future */}
                                            <img src={profile.picpath} onError={(event) => event.target.src = 'https://eng.asu.edu.eg/img/user.png'}  alt="avatar" style={{width:"100px",height:"100px",objectFit:"cover",borderRadius:"500px"}}/>
                                        </div>
                                        <div className='col-9 d-flex align-items-center friendsDetail'>
                                            <h1>
                                                <Link to={`/profile/${userid}/${profile.userid}`}>
                                                {profile.firstName} {profile.lastName} <br/>
                                                <small className='text-muted'>from {profile.city}</small> <br/>
                                                </Link>
                                                <button><i className="bi bi-check-lg green" onClick={acceptRequestHandler} id={profile.requestorid}></i></button>
                                                <button><i className="bi bi-x-lg red" onClick={delRequestHandler} id={profile.requestid}></i></button>
                                            </h1>
                                        
                                        </div>
                                    </div>
                                </div>
                            </Fade>
                            ))}
                            </div>    
                        </div>
                        
                    </div>
                    
                    
                </div>
            </section>
        </>
    )
}

export default FriendRequests
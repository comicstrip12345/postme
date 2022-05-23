import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import NavbarLoggedIn from './NavbarLoggedIn';
import { Fade } from 'react-reveal';
import 'bootstrap-icons/font/bootstrap-icons.css'

const FriendRequests = () => {
    const {userid} = useParams();

    const [profiles, setProfiles] = useState([]);
    const [pageUpdater, setPageUpdater]=useState(1)
    
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
                console.log(res)
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
                        </div>
                        {profiles.map((profile,index)=> (
                        <Fade key={index}>
                            <div className='col-4 friendsProfile'>
                                <div className='row'>
                                    <div className='col-3 friendsImage'>
                                        {/* container ng image sa future */}
                                        <img src="https://e7.pngegg.com/pngimages/505/761/png-clipart-login-computer-icons-avatar-icon-monochrome-black-thumbnail.png" alt="avatar"/>
                                    </div>
                                    <div className='col-9 d-flex align-items-center friendsDetail'>
                                        <h1>
                                            {profile.firstName} {profile.lastName} <br/>
                                            <small className='text-muted'>from {profile.city}</small> <br/>
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
            </section>
        </>
    )
}

export default FriendRequests
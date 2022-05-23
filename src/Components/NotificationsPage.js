import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import NavbarLoggedIn from './NavbarLoggedIn';
import { Link } from 'react-router-dom';

const NotificationsPage = () => {
    const {userid}=useParams()
    const [notifs,setNotifs]=useState([]);

    useEffect(() => {
        axios
            .post("https://serserserver.herokuapp.com/notiffeed")
            .then((response) => {
                console.log(response)
                setNotifs(response["data"]["array"])
            });
        }, []);

    return (
        <>
            <NavbarLoggedIn
                link={userid}
            />
            <section className='notifications'>
                <div className='container pt-5'>
                    <h1 className='title'>Notifications</h1>
                    <div className='row'>
                        <div className='col-6'>
                            <h1 className='menu'>New</h1>
                            {notifs.map((notif,index) => (
                                <div className='row' key={index}>
                                {/* eslint-disable-next-line */}
                                    {notif.new_comment==="1" && notif.notiftype==="post" && notif.wallid==userid? 
                                    <Link to={`/indivpost/${userid}/${notif.postid}`}><div className='col-12 notif'>
                                        <div className='row'>
                                            <div className='col-1 p-0 d-flex align-items-center'>
                                                <div className='blueDot'>
                                                </div>
                                            </div>
                                            <div className='col-2 p-0'>
                                                <div className='circlePhoto'>
                                                    <img src={notif.ownerpicpath} alt="avatar" style={{width:"70px",height:"70px",objectFit:"cover",borderRadius:"500px"}}/>
                                                </div>
                                            </div>
                                            <div className='col-9 p-0 d-flex align-items-center'>
                                                <div className='notifTile'>
                                                    <p>{notif.whopostedFN} {notif.whopostedLN} <span>added a</span> {notif.notiftype} <span>on your wall</span> </p>
                                                    <p><span>{notif.date_created}</span></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div></Link> : <></>}

                                     {/* eslint-disable-next-line */}
                                     {notif.new_comment==="1" && notif.notiftype==="post" && notif.userid==userid? 
                                    <Link to={`/indivpost/${userid}/${notif.postid}`}><div className='col-12 notif'>
                                        <div className='row'>
                                            <div className='col-1 p-0 d-flex align-items-center'>
                                                <div className='blueDot'>
                                                </div>
                                            </div>
                                            <div className='col-2 p-0'>
                                            <div className='circlePhoto'>
                                            <img src={notif.wallownerpicpath} alt="avatar" style={{width:"70px",height:"70px",objectFit:"cover",borderRadius:"500px"}}/>
                                                </div>
                                            </div>
                                            <div className='col-9 p-0 d-flex align-items-center'>
                                                <div className='notifTile'>
                                                    <p>{notif.whopostedFN} {notif.whopostedLN} <span>added a</span> {notif.notiftype} <span>his post on your wall</span> </p>
                                                    <p><span>{notif.date_created}</span></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div></Link> : <></>}

                                    {/* eslint-disable-next-line */}
                                    {notif.new_comment==="1" && notif.notiftype==="comment" && notif.wallid==userid? 
                                    <Link to={`/indivpost/${userid}/${notif.postid}`}><div className='col-12 notif'>
                                        <div className='row'>
                                            <div className='col-1 p-0 d-flex align-items-center'>
                                                <div className='blueDot'>
                                                </div>
                                            </div>
                                            <div className='col-2 p-0'>
                                                <div className='circlePhoto'>
                                                <img src={notif.ownerpicpath} alt="avatar" style={{width:"70px",height:"70px",objectFit:"cover",borderRadius:"500px"}}/>
                                                </div>
                                            </div>
                                            <div className='col-9 p-0 d-flex align-items-center'>
                                                <div className='notifTile'>
                                                    <p>{notif.whopostedFN} {notif.whopostedLN} <span>added a</span> {notif.notiftype} <span>on a post on your wall</span></p>
                                                    <p><span>{notif.date_created}</span></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div></Link> : <></>}
                                </div> 
                                ))
                            } 
                        </div>
                        <div className='col-6'>
                            <h1 className='menu'>Other Notifications</h1>
                            {notifs.map((notif,index) => (
                                <div className='row' key={index}>
                                
                                {/* eslint-disable-next-line */}
                                    {notif.new_comment==="0" && notif.notiftype==="post" && notif.wallid==userid? 
                                    <div className='col-12 notif'>
                                        <div className='row'>
                                            <div className='col-2'>
                                                <div className='circlePhoto'>
                                                <img src={notif.wallownerpicpath} alt="avatar" style={{width:"70px",height:"70px",objectFit:"cover",borderRadius:"500px"}}/>
                                                </div>
                                            </div>
                                            <div className='col-10 p-0 d-flex align-items-center'>
                                                <div className='notifTile'>
                                                    <p>{notif.whopostedFN} {notif.whopostedLN} <span>added a</span> {notif.notiftype} <span>on your wall</span></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>: <></>}

                                    {/* eslint-disable-next-line */}
                                    {notif.new_comment==="0" && notif.notiftype==="comment" && notif.wallid==userid? 
                                    <div className='col-12 notif'>
                                        <div className='row'>
                                            <div className='col-2'>
                                                <div className='circlePhoto'>

                                                </div>
                                            </div>
                                            <div className='col-10 p-0 d-flex align-items-center'>
                                                <div className='notifTile'>
                                                    <p>{notif.whopostedFN} {notif.whopostedLN} <span>added a</span> {notif.notiftype} <span>on a post on your wall</span></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>: <></>}
                                </div> 
                                ))
                            }
                        </div>
                    </div>
                    
                    
                
                
                
                

                 
                
                </div>
            </section>
            
        </>
        


    )
}

export default NotificationsPage
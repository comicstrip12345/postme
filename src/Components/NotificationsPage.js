import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import NavbarLoggedIn from './NavbarLoggedIn';

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
                    <h1 className='menu'>New</h1>
                
                {notifs.map((notif,index) => (
                    <div className='row' key={index}>
                    
                    {/* eslint-disable-next-line */}
                        {notif.new_comment==="1" && notif.notiftype==="post" && notif.wallid==userid? 
                        <>
                            {notif.whopostedFN} {notif.whopostedLN} added a {notif.notiftype} on your wall
                        </> : <></>}

                        {/* eslint-disable-next-line */}
                        {notif.new_comment==="1" && notif.notiftype==="comment" && notif.wallid==userid? 
                        <>
                            {notif.whopostedFN} {notif.whopostedLN} added a {notif.notiftype} on a post on your wall
                        </> : <></>}
                    
                    </div> 
                    
                    ))
                } 
                
                <h1 className='menu'>Other Notifications</h1>

                {notifs.map((notif,index) => (
                    <div className='row' key={index}>
                    
                    {/* eslint-disable-next-line */}
                        {notif.new_comment==="0" && notif.notiftype==="post" && notif.wallid==userid? 
                        <>
                            {notif.whopostedFN} {notif.whopostedLN} added a {notif.notiftype} on your wall
                        </> : <></>}

                        {/* eslint-disable-next-line */}
                        {notif.new_comment==="0" && notif.notiftype==="comment" && notif.wallid==userid? 
                        <>
                            {notif.whopostedFN} {notif.whopostedLN} added a {notif.notiftype} on a post on your wall
                        </> : <></>}
                    
                    </div> 
                    
                    ))
                } 
                
                </div>
            </section>
            
        </>
        


    )
}

export default NotificationsPage
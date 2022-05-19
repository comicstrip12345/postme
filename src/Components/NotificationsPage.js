import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

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
    <div className='container p-5'>
        <h1 className='h1 text-center'>Your Notifications</h1>
        <h3 className='h3 text-center'>New Notifications</h3>
    
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
    
    <h3 className='h3 text-center'>Other Notifications</h3>

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


  )
}

export default NotificationsPage
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import NavbarLoggedIn from './NavbarLoggedIn';

const NotifIndivPost = () => {
    const {userid} = useParams();
    const {postid} = useParams();
    const [postidd ,setPostidd] = useState(postid)
    const [notifPost,setNotifPost] = useState([])
    
    useEffect(() => {
        axios
            .post("https://serserserver.herokuapp.com/postfeed",{userid: userid})
            .then((response) => {
                console.log(response)
                console.log(userid);
                console.log(postid);
                setNotifPost(response["data"]["array"])
            });
        }, []);
    return (
        // 
        <>
        <NavbarLoggedIn/>
        <section className='notifInvdivPost'>
            <div className='container'>
                <div className='row'>
                    <div className='col-7'>
                        

                    {/* {notifPost.map((post, index)=>{
                    <div className='coL-12' key={index}>
                        {post.postid === {postidd}? 
                        <p>{post.content}</p> : <></>
                        }
                    
                    
                    </div>
            })} */}
                    </div>
                </div>
            </div>
        </section>
        
        
        </>
        
    )
}

export default NotifIndivPost
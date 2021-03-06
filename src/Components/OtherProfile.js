import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import NavbarLoggedIn from './NavbarLoggedIn';
import 'bootstrap-icons/font/bootstrap-icons.css'
import OtherProfileFeedSettings from './OtherProfileFeedSettings';
import swal from 'sweetalert'; 


const OtherProfile = () => {

    const {userid} = useParams();
    const {wallOwnerId} = useParams();
    const [profile, setProfile] = useState([]);
    const [yourProfile, setYourProfile] = useState([]);
    const [hasFriendRequest, setHasFriendRequest] = useState(false);
    const [stateChanger,setStateChanger] = useState(1)
    const [friend, setFriend] = useState(false);
    
        useEffect(
            ()=> {
                axios.post("https://serserserver.herokuapp.com/profile", {userid:wallOwnerId} ).then((res)=> {
                    if(res.status===200){
                        const id = res["data"]["array"][0]
                        setProfile(id)
                    }
                })

                axios.post("https://serserserver.herokuapp.com/profile", {userid:userid} ).then((res)=> {
                    if(res.status===200){
                        const id = res["data"]["array"][0]
                        setYourProfile(id)
                    }
                })

                axios.post("https://serserserver.herokuapp.com/frsearcher", {userid:userid, wallid:wallOwnerId} ).then((res)=> {
                    if(res.data.array.length>0){
                        setHasFriendRequest(true)
                    }
                })

                axios.post("https://serserserver.herokuapp.com/flsearcher", {userid:userid, wallid:wallOwnerId} ).then((res)=> {
                    if(res.data.array.length>0){
                        console.log(res)
                        setFriend(true)
                    }
                })
            },
            [stateChanger,userid,wallOwnerId]
        )

    const addFriend = () => {
        axios.post("https://serserserver.herokuapp.com/friendrequest", {
            userid:userid,
            otherid:wallOwnerId}).then((res)=> {
                    console.log(res)
                    swal("Added as friend", "Please wait for the user's response", "info"); 
                    setStateChanger(stateChanger+1)
                })

    }

    const deleteFriend = () => {
        axios.post("https://serserserver.herokuapp.com/deletefriend", {
            userid:userid,
            friendid:wallOwnerId}).then((res)=> {
                    console.log(res)
                    swal("Deleted friend", "We have removed this user from your friend's list", "info"); 
                    setStateChanger(stateChanger+1)
                })

    }

  return (
    <>
        <NavbarLoggedIn
            link={userid}
        />
        <section className='profile'>
            <div className='container'>
                <div className='row'>
                    <div className='col-2'>
                        <div className='circlePhoto'>
                        <img src={`${profile.picpath}`} onError={(event) => event.target.src = 'https://eng.asu.edu.eg/img/user.png'}  style={{width:"160px", height:"160px",objectFit:"cover", borderRadius:"160px"}}  alt="profile avatar"/>
                        </div>
                    </div>
                    <div className='col-10 otherProfile d-flex align-items-center'>
                        <h1>
                            {profile.firstName} {profile.lastName} <br/>
                            <p>{profile.nickname}</p>

                            {
                             friend? 
                             <button type="button" className='btn btn-danger' onClick={deleteFriend}>Delete Friend</button>  : 
                             <span> </span>
                            }
                            
                            
                            {
                            !hasFriendRequest && !friend ? <button type="button" className='btn btn-primary' onClick={addFriend}>Add Friend</button> :
                            <span> </span>
                            }

                            {
                            hasFriendRequest && !friend ? 
                            <button type="button" className='btn btn-primary' disabled>Friend request sent</button> :
                            <span> </span>
                            }
                            
                        </h1>
                    </div>

                    {friend?
                     <div className='col-12 profileFeed'>
                     <div className='row'>
                         <div className='col-5 info'>
                             <div className='row'>
                                 <div className='col-12 intro'>
                                     <h1>Intro</h1>
                                     <p>{profile.intro}</p>
                                     <p>{profile.status}</p>
                                     <p>{profile.birthday}</p>
                                     <p>{profile.city}</p>
                                 </div>
                             </div>
                         </div>
                         <div className='col-7 newsFeed'>
                             <div className='row'>
                                 <OtherProfileFeedSettings userid={`${userid}`} wallOwnerId={`${wallOwnerId}`} picpath={yourProfile.picpath} ownerpicpath={profile.picpath} />
                                
                             </div>
                         </div>
                     </div>
                    </div>:
                 
                    <div className='col-12 privateProfile'>
                        <div className='row '>
                            <div className='col-4 image'>
                                <img src={require("../images/lock.png")} alt="lock"/>
                            </div>
                            <div className='col-8 warning d-flex align-items-center'>
                                <h1> This Profile is Private</h1>
                            </div>
                            
                        </div>
                    </div>}
                   
                </div>
            </div>
        </section>
        


    </>

    
  )
}

export default OtherProfile
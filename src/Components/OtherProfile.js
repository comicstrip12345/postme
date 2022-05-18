import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import NavbarNotLoggedin from './NavbarNotLoggedIn'
import 'bootstrap-icons/font/bootstrap-icons.css'
import OtherProfileFeedSettings from './OtherProfileFeedSettings';

const OtherProfile = () => {

    const {userid} = useParams();
    const {wallOwnerId} = useParams();
    const [profile, setProfile] = useState([]);
    const [hasFriendRequest, setHasFriendRequest] = useState(false);
    const [stateChanger,setStateChanger] = useState(1)
    
        useEffect(
            ()=> {
                axios.post("https://serserserver.herokuapp.com/profile", {userid:wallOwnerId} ).then((res)=> {
                    if(res.status===200){
                        const id = res["data"]["array"][0]
                        setProfile(id)
                    }
                })

                axios.post("https://serserserver.herokuapp.com/frsearcher", {userid:userid, wallid:wallOwnerId} ).then((res)=> {
                    if(res.data.array.length>0){
                        setHasFriendRequest(true)
                    }
                })
            },
            [stateChanger]
        )

    const addFriend = () => {
        console.log("friend request sent")
        axios.post("https://serserserver.herokuapp.com/friendrequest", {
            userid:userid,
            otherid:wallOwnerId}).then((res)=> {
                    console.log(res)
                    setStateChanger(stateChanger+1)
                })

    }

  return (
    <>
        <NavbarNotLoggedin/>
        <section className='profile'>
            <div className='container'>
                <div className='row'>
                    <div className='col-2'>
                        <div className='circlePhoto'>

                        </div>
                    </div>
                    <div className='col-10 profileName d-flex align-items-center'>
                        <h1>
                            {profile.firstName} {profile.lastName} <br/>
                            <p>Adrii</p>
                            {
                            !hasFriendRequest ? <button type="button" className='btn btn-primary' onClick={addFriend}>Add Friend</button> :
                            <button type="button" className='btn btn-primary' disabled>Friend request sent</button>
                            }
                            
                        </h1>
                    </div>
                    <div className='col-12 profileFeed'>
                        <div className='row'>
                            <div className='col-5 info'>
                                <div className='row'>
                                    <div className='col-12 intro'>
                                        <h1>Intro</h1>
                                        <p>Studied <span>BS. in Aeronautical Engineering</span> at <span>Philippine State College of Aeronautics</span></p>
                                        <p>Work at <span>Bahay</span> for <span>Front End Web Developer</span></p>
                                        <p>Single</p>
                                        <p>December 22, 1994</p>
                                        <p>{profile.city}</p>
                                        <p>Basketball, Volleyball, Coding</p>
                                    </div>
                                </div>
                            </div>
                            <div className='col-7 newsFeed'>
                                <div className='row'>
                                    <OtherProfileFeedSettings userid={`${userid}`} wallOwnerId={`${wallOwnerId}`} />
                                   
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        


    </>

    
  )
}

export default OtherProfile
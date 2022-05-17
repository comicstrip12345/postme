import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import NavbarNotLoggedin from './NavbarNotLoggedIn'
import ProfileFeedSettings from './ProfileFeedSettings';
import ProfileFeedPost from './ProfileFeedPost';
import 'bootstrap-icons/font/bootstrap-icons.css'

const IndividualProfile = () => {

    const {userid} = useParams();
    const [profile, setProfile] = useState([])
    
        useEffect(
            ()=> {
                axios.post("https://serserserver.herokuapp.com/profile", {userid:userid} ).then((res)=> {
                    if(res.status===200){
                        console.log(res)
                        
                        const id = res["data"]["array"][0]
                        console.log(id)

                        setProfile(id)
                    }
                })
            },
            []
        )

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
                                        <p>Bacoor Cavite</p>
                                        <p>Basketball, Volleyball, Coding</p>
                                        <button><h1>Edit Details</h1></button>
                                    </div>
                                </div>
                            </div>
                            <div className='col-7 newsFeed'>
                                <div className='row'>
                                    <ProfileFeedSettings/>
                                    <ProfileFeedPost/>
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

export default IndividualProfile
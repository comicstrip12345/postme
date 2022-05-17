import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const FriendRequests = () => {
    const {userid} = useParams();

    const [profiles, setProfiles] = useState([]);
    
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
        []
    )

  return (
    <div className='container text-center'>
        <h1>FRIEND REQUESTS</h1>

        {
                    profiles.map((profile,index)=> (
                        <div className='container' key={index}>
                            <div className='row justify-content-center'>
                                <div className='col-3'>
                                    {/* container ng image sa future */}
                                    <img src="https://e7.pngegg.com/pngimages/505/761/png-clipart-login-computer-icons-avatar-icon-monochrome-black-thumbnail.png" alt="avatar" style={{width:"50px"}}></img>
                                </div>

                                <div className='col-9'>
                                    <div className='row text-start'>     
                                        {profile.firstName} {profile.lastName} 
                                    </div>
                                    <div className='row text-start'>     
                                        <small className='text-muted'>from {profile.city} </small>
                                    </div>
                                    
                                </div>
                            </div>

                           

                        </div>
                    )

                       

                    )
                }

    </div>
  )
}

export default FriendRequests
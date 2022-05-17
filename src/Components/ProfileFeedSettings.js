import React, { useState } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import axios from 'axios';
import ProfileFeedPost from './ProfileFeedPost';


const ProfileFeedSettings = (props) => {
    
    const userid = props.userid
    const [post, setPost] = useState();
    const [postCounter, setPostCounter] = useState(1);

    const submitHandler = () => {
        axios.post("https://serserserver.herokuapp.com/newpost",{
            userid:userid,
            post:post,
        }).then((response)=> {
            console.log(response)
            setPostCounter(postCounter+1)
            console.log(postCounter)

        })
        console.log(`${userid},${post}`)
    }

    return (
        <div className='col-12 feed'>
            <div className='row pb-5'>
                <div className='col-2'>
                    <div className='profImage'>

                    </div>
                </div>
                <div className='col-10 postInput'>
                    <div className="form-floating form">
                        <i className="bi bi-send" onClick={submitHandler}></i>
                        <input type="text" className="form-control" id="post" placeholder="text" onChange={(e)=> { setPost(e.target.value) }}/>
                        <label htmlFor="post">Post Something...</label>
                    </div>
                </div>
            </div>

            <ProfileFeedPost userid={`${userid}`} postCounter={postCounter} />
        </div>
    )
}

export default ProfileFeedSettings
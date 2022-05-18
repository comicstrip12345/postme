import React, { useRef, useState } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import axios from 'axios';
import OtherProfileFeedPost from './OtherProfileFeedPost';


const OtherProfileFeedSettings = (props) => {
    
    const userid = props.userid
    const wallid = props.wallOwnerId
    const [post, setPost] = useState();
    const [postCounter, setPostCounter] = useState(1);
    const postRef = useRef();

    const submitHandler = () => {
        axios.post("https://serserserver.herokuapp.com/newpostother",{
            userid:userid,
            wallid:wallid,
            post:post,
        }).then((response)=> {
            console.log(response)
            setPostCounter(postCounter+1)
            console.log(postCounter)
            postRef.current.value=""

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
                        <input type="text" className="form-control" id="post" ref={postRef} placeholder="text" onChange={(e)=> { setPost(e.target.value) }}/>
                        <label htmlFor="post">Post Something...</label>
                    </div>
                </div>
            </div>

            <OtherProfileFeedPost userid={`${wallid}`} postCounter={postCounter} />
        </div>
    )
}

export default OtherProfileFeedSettings
import React, { useEffect, useRef, useState } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import axios from 'axios';
import OtherProfileFeedPost from './OtherProfileFeedPost';


const OtherProfileFeedSettings = (props) => {
    
    const userid = props.userid
    const wallid = props.wallOwnerId
    const [post, setPost] = useState();
    const [notifRunner,setNotifRunner] = useState(false)
    const [postCounter, setPostCounter] = useState(1);
    const postRef = useRef();
    const [createdPostId,setCreatedPostid]=useState()

    const submitHandler =  async () => {
        await axios.post("https://serserserver.herokuapp.com/newpostother",{
            userid:userid,
            wallid:wallid,
            post:post,
        }).then((response)=> {
            console.log(response)
            setCreatedPostid(response["data"]["array"]["insertId"])
            setNotifRunner(true)
           
        })
    }

  
    useEffect(()=>{
     
            console.log(`running notifs ${createdPostId}`)
            axios.post("https://serserserver.herokuapp.com/newpostothernotif",{
                userid:userid,
                wallid:wallid,
                postid:createdPostId,
                notiftype:"post"
            }).then((response)=> {
                console.log(response)
                postRef.current.value=""
                setPostCounter(postCounter+1)
    
            })
        
    // eslint-disable-next-line
    },[notifRunner])

    

    return (
        <>
            <div className='col-12 feed'>
                <div className='row'>
                    <div className='col-2'>
                        <div className='profImage'>

                        </div>
                    </div>
                    <div className='col-10 postInput'>
                        <div className="form-floating form input-group">
                            <input type="text" className="form-control" id="post" ref={postRef} placeholder="text" onChange={(e)=> { setPost(e.target.value) }}/>
                            <label htmlFor="post">Post Something...</label>
                            <button onClick={submitHandler}><i className="bi bi-send"></i></button>
                        </div>
                    </div>
                </div>
            </div>
            <OtherProfileFeedPost userid={`${wallid}`} commentorid={userid} postCounter={postCounter} />
        </>
        
    )
}

export default OtherProfileFeedSettings
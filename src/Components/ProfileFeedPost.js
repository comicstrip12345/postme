import axios from 'axios'
import React, { useEffect, useState } from 'react'

const ProfileFeedPost = (props) => {

   
    const [posts,setPosts] = useState([])
    const counter = props.postCounter


    useEffect(()=> {
        const id=props.userid

        axios.post("https://serserserver.herokuapp.com/postfeed",{
            userid:id,
        }).then((response)=> {
            console.log(response)
            setPosts(response["data"]["array"])
            
        })

},[counter])
  
       


    return (

        <>
        {posts.map((post,index)=> (
            <div className='col-12 post' key={index}>
            <div className='row'>
                <div className='col-2'>
                    <div className='profImage'>

                    </div>
                </div>
                <div className='col-10 postName d-flex align-items-center'>
                    <h1>
                        {post.firstName} {post.lastName}
                        <p>{post.date_created} hrs.</p>
                    </h1>
                </div>
                <div className='col-12 postContent'>
                    <p>{post.content}</p>
                </div>
                <div className='col-12 postMenu'>
                    <div className='row'>
                        <div className='col-6'>
                            <p><a href='#/'>Like</a></p>
                        </div>
                        <div className='col-6'>
                            <p><a href='#/'>Comment</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        ))}
        

        </>
    )
}

export default ProfileFeedPost
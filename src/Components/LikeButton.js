import axios from 'axios'
import React, { useEffect, useState } from 'react'
import LikeFeed from './LikeFeed'

const LikeButton = (props) => {

    const commentorid=props.commentorid
    const postid=props.postid

    const [like,setLike]=useState(false)
    const [likeCounter,setLikeCounter]=useState(1)

    useEffect(
        ()=> {

            axios.post("https://serserserver.herokuapp.com/likesearcher", {userid:commentorid,
            postid:postid} ).then((res)=> {
                if(res.data.array.length>0){
                    setLike(true)
                }
            })
        },
        []
    )

    const likeHandler = () => {

    
        console.log(`${commentorid}  ${postid}`)
         axios.post("https://serserserver.herokuapp.com/addlike",{
                userid:commentorid,
                postid:postid,
            }).then((response)=> {
                console.log(response)
                setLike(true)
                setLikeCounter(likeCounter+1)
            })
    }

    const unlikeHandler = () => {
        console.log(`${commentorid}  ${postid}`)
        axios.post("https://serserserver.herokuapp.com/deletelike",{
               userid:commentorid,
               postid:postid,
           }).then((response)=> {
               console.log(response)
               setLike(false)
               setLikeCounter(likeCounter+1)
           })
    }

  return (
    <>
    
    <LikeFeed postid={postid} likecounter={likeCounter}/>

    {!like?
    <div onClick={likeHandler} className='text-center'>
        <p>Like</p>
    </div>:

    <div onClick={unlikeHandler} className='text-center'>
        <p style={{color:'blue'}}>Liked</p>
    </div>
    }

    
    </>
  )
}

export default LikeButton
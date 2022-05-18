import axios from 'axios'
import React, { useEffect, useState } from 'react'

const ProfileFeedPost = (props) => {

   
    const [posts,setPosts] = useState([])
    const origCounter = props.postCounter
    const [counter,setCounter] = useState(props.postCounter)
    // eslint-disable-next-line
    const id=props.userid

    
    useEffect(()=> {
        

        axios.post("https://serserserver.herokuapp.com/postfeed",{
            userid:id,
        }).then((response)=> {
            console.log(response)
            setPosts(response["data"]["array"])
            
        })
// eslint-disable-next-line
},[origCounter,counter])
  
const deleteHandler = (e) => {
    const postid = e.target.id
    console.log(`${postid} id clicked`)

    axios
      .post("https://serserserver.herokuapp.com/deletepost", {
        postid:postid
      })
      .then((response) => {
        console.log(response)
        setCounter(counter+1)
      });

  }
       
    


    return (

        <>
        {posts.map((post, index) => (
  
          <div className="col-12 post" key={index}>
            <div className="row">
              <div className="col-2">
                <div className="profImage"></div>
              </div>
              <div className="col-8 postName d-flex align-items-center">
                <h1>
                  {post.firstName} {post.lastName}
                  
                  {post.wallid !== post.userid && (
                    <span>
                      {" "}
                      &gt; {post.wallOwnerFirstName} {post.wallOwnerLastName}{" "}
                    </span>
                  )}
                  <p>{post.date_created} hrs.</p>
                </h1>
              </div>
  
              
              <div className="col-2 postName d-flex align-items-center">
              
  
              
               <div className="dropdown">
                  <a
                    className="btn btn-outline-black dropdown-toggle"
                    href="/#"
                    role="button"
                    id="dropdownMenuLink"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    
                  </a>
  
                  <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                 
                      <li>  
                        <div className="dropdown-item" id={post.postid} >
                          Edit Post
                        </div>
                      </li>
                      <li>
                        <div className="dropdown-item" id={post.postid} onClick={(e)=>deleteHandler(e)} >
                          Delete Post
                        </div>
                      </li>
                  
                   
  
                  </ul>
                </div> 
               
              
                </div>
              <div className="col-12 postContent">
                <p>{post.content}</p>
              </div>
              <div className="col-12 postMenu">
                <div className="row">
                  <div className="col-6">
                    <p>
                      <a href="#/">Like</a>
                    </p>
                  </div>
                  <div className="col-6">
                    <p>
                      <a href="#/">Comment</a>
                    </p>
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
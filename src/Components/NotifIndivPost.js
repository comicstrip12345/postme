import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import NavbarLoggedIn from './NavbarLoggedIn';
import CommentFeed from './CommentFeed';
import LikeButton from './LikeButton';
import 'bootstrap-icons/font/bootstrap-icons.css'

const NotifIndivPost = () => {
    const {userid} = useParams();
    const {postid} = useParams();
    const [notifPost,setNotifPost] = useState([])

    const [counter, setCounter] = useState(1);
  const [commenting,setCommenting] = useState(false);
  const [formInput,setFormInput] = useState({
    content:"",
    });

    const [commentInput,setCommentInput] = useState("");
    
    useEffect(() => {
        axios
            .post("https://serserserver.herokuapp.com/postfeed",{userid: userid})
            .then((response) => {
                console.log(response)
                setNotifPost(response["data"]["array"])
                console.log(notifPost)
            });
        }, [notifPost,userid]);


        const deleteHandler = (e) => {
            const postid = e.target.id;
    
            axios
            .post("https://serserserver.herokuapp.com/deletepost", {
                postid: postid,
            })
            .then((response) => {
                console.log(response);
                setCounter(counter + 1);
            });
        };
    
        const handleInput = (e) => {
        e.preventDefault()
        setFormInput({...formInput,[
            e.target.name
        ]:e.target.value})
        }
    
        const saveEditHandler = (e) => {
        e.preventDefault()
        const postid = e.target.id;
         const data = {
             postid: postid,
             content:formInput.content
           
         }
    
         axios.post("https://serserserver.herokuapp.com/editpost", data ).then((res)=> {
                    if(res.status===200){
                        console.log(res)
                        setCounter(counter + 1)
                        
                    }
                }) 
            }
    
        const commentHandler = () => {
            setCommenting(true)
        }
    
        const handleCommentInput = (e) => {
            e.preventDefault()
            setCommentInput(e.target.value)
            }
       
    
        const writeComment = (e) => {
            e.preventDefault()
            const postid = e.target.id;
        
            const data = {
                userid:userid,
                postid:postid,
                content:commentInput
            }
    
            axios.post("https://serserserver.herokuapp.com/addcomment", data ).then((res)=> {
                        if(res.status===200){
                            console.log(res)
                            setCounter(counter + 1)
                            setCommentInput("")
                        }
                    }) 
        }
    
    return (
        // 
        <>
        <NavbarLoggedIn
          link={userid}
        />
        <section className='notifIndivPost'>
            <div className='container'>
                <div className='row notifTiles'>
                    <div className='col-2'></div>
                    <div className='col-8'>
                      {notifPost.map((post, index)=>(
                      <div className='row' key={index}>
                          {/* eslint-disable-next-line */}
                          {post.postid == postid? 
                          <div className="col-12 post" key={index}>
                            <div className="row">
                              <div className="col-2">
                                <div className="profImage">
                             
              <img src={post.picpath} style={{width:"70px", height:"70px",objectFit:"cover", borderRadius:"70px"}}  alt="profile avatar"/>
              
                                </div>
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
                              <div className="col-2 postSettings">
                                  <div className="dropdown text-end">
                                    <a
                                      className="btn btn-outline-black "
                                      href="/#"
                                      role="button"
                                      id="dropdownMenuLink"
                                      data-bs-toggle="dropdown"
                                      aria-expanded="false"
                                    ><i className="bi bi-three-dots"></i> </a>
                                    <ul
                                      className="dropdown-menu dropdown-menu-end"
                                      aria-labelledby="dropdownMenuLink"
                                    >
                                      {post.wallid === post.userid && (
                                    <li>
                                    <div className="dropdown-item" id={post.postid}>
                                      
                                      <button
                                        type="button" className="btn btn-outline-black border-0"
                                        data-bs-toggle="modal"
                                        data-bs-target={`#exampleModal${post.postid}`}
                                        id={post.postid}
                                      >
                                        Edit post
                                      </button>

                                    </div>
                                  </li>
                                  )}
                                      
                                      <li>
                                        <div
                                          className="dropdown-item"
                                          
                                        >
                                          <button id={post.postid}
                                          onClick={(e) => deleteHandler(e)} type="button" className="btn btn-outline-black border-0"  >Delete Post</button>
                                        </div>
                                      </li>
                                    </ul>
                                  </div>
                              </div>
                              <div className="col-12 postContent">
                                <p>{post.content}</p>
                                <div
                                  className="modal fade"
                                  id={`exampleModal${post.postid}`}
                                  tabIndex="-1"
                                  aria-labelledby="exampleModalLabel"
                                  aria-hidden="true"
                                >
                                  <div className="modal-dialog">
                                    <div className="modal-content">
                                      <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">
                                          Edit Post
                                        </h5>
                                        <button
                                          type="button"
                                          className="btn-close"
                                          data-bs-dismiss="modal"
                                          aria-label="Close"
                                        ></button>
                                      </div>
                                      <div className="modal-body">
                                        <div className="form-floating mb-3 form">
                                          <input
                                            type="text"
                                            className="form-control"
                                            id="floatingUsername"
                                            placeholder="text"
                                            name="content" onChange={handleInput}
                                          />
                                          <label htmlFor="floatingUsername">
                                            New Post Content
                                          </label>
                                        </div>
                                      </div>
                                      <div className="modal-footer">
                                        <button
                                          type="button"
                                          className="btn btn-secondary"
                                          data-bs-dismiss="modal"
                                        >
                                          Close
                                        </button>
                                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" id={post.postid} onClick={saveEditHandler}>
                                          Save changes
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 postMenu">
                                <div className="row">
                                  <div className="col-6 likes">
                                    <LikeButton commentorid={userid} postid={post.postid}/>
                                  </div>
                                  <div className="col-6 comment text-center">
                                    <div className='row'>
                                      <div className='col-12 buttons'>
                                        <button onClick={commentHandler}><p>Comment</p></button>
                                      </div>
                                    </div>             
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 comments">
                                <CommentFeed postid={post.postid} counter={counter} id={userid}/> 
                              </div>
                              {
                                commenting && (
                                  <div className="col-12 form-floating form input-group">
                                      <input type="text" hidden name="postid" />
                                      <input type="text" style={{borderTopLeftRadius: '2vh',borderBottomLeftRadius: '2vh' }} className="form-control"
                                      placeholder="Comment" name="content" onChange={handleCommentInput} value={commentInput}  />
                                      <label htmlFor="post">Write a comment</label>
                                      <button onClick={writeComment}><i className="bi bi-send" id={post.postid}></i></button>
                                  </div>
                                )
                              }
                            </div>
                          </div> : <span> </span>
                          }
                      </div>
                      ))}
                    </div>
                    <div className='col-2'></div>
                </div>
            </div>
        </section>
        </>
        
    )
}

export default NotifIndivPost
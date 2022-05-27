import axios from "axios";
import React, { useEffect, useState } from "react";
import CommentFeed from "./CommentFeed";
import 'bootstrap-icons/font/bootstrap-icons.css'
import LikeButton from "./LikeButton";
import { Link } from "react-router-dom";
import Moment from 'react-moment';
import 'moment-timezone';

const HomepageFeedPost = (props) => {
  const profileupdater = props.profileupdater;
  const origCounter = props.postCounter;
  const id = props.userid;
  const [userid,setUserid]=useState(id)
  const picpath = props.picpath;

  const [counter, setCounter] = useState(props.postCounter);
  const [commenting,setCommenting] = useState(false);
  const [posts, setPosts] = useState([]);
  const [formInput,setFormInput] = useState({
    content:"",
    });

    const [commentInput,setCommentInput] = useState("");
    const [noPostContent,setNoPostContent]=useState(false)

    const [notifTrigger, setNotifTrigger] = useState(false);
    const [commentIdAdded, setCommentIdAdded] = useState([]);
    const [postOwner, setPostOwner] = useState([]);


    
    useEffect(() => {
        axios
        .post("https://serserserver.herokuapp.com/homepagefeed", {
            userid: id,
        })
        .then((response) => {
            console.log(response);

            if(response["data"]["array"].length===0){
              setNoPostContent(true)
            }

            else if(response["data"]["issue"]==="no friends"){
              setNoPostContent(false)
              setPosts(response["data"]["array"]);
            }

            else{
              setPosts(response["data"]["array"]);
              setNoPostContent(false)
            }
           ;
        });
    
    }, [origCounter, counter, profileupdater,id]);

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
            userid:id,
            postid:postid,
            content:commentInput
        }

        axios.post("https://serserserver.herokuapp.com/addcomment", data ).then((res)=> {
                    if(res.status===200){
                        console.log(res)

                        setCommentIdAdded(res["data"]["array"]["insertId"])
                        setPostOwner(postid)
                        setNotifTrigger(true)

                        setCounter(counter + 1)
                        setCommentInput("")
                    }
                }) 
    }

    useEffect(() => {
      axios
        .post("https://serserserver.herokuapp.com/newcommentnotif", {
          userid: id,
          commentid: commentIdAdded,
          postid: postOwner,
          notiftype: "comment",
        })
        .then((response) => {
          console.log(response);
        });
  
    // eslint-disable-next-line
    }, [notifTrigger]);



  return (
    <>
      {noPostContent && 
      <>
        <div className="col-12 noPostImage">
          <img src={require("../images/user.png")} alt="user"/>
        </div>
        <div className="col-12 noPostContent">
          <p>You have no posts to see in the homepage yet. Start posting or <Link to={`/searchpage/${userid}`}>search for your friends</Link> to see their posts! </p>
        </div>
      </>
      }
      {posts.map((post, index) => (
        <div className="col-12 post" key={index}>
          <div className="row">
            <div className="col-2">
              <div className="profImage">
              {post.wallid === post.userid ?
              <img src={picpath} onError={(event) => event.target.src = 'https://eng.asu.edu.eg/img/user.png'}  style={{width:"70px", height:"70px",objectFit:"cover", borderRadius:"70px"}}  alt="profile avatar"/>:
              <img src={post.picpath} onError={(event) => event.target.src = 'https://eng.asu.edu.eg/img/user.png'}  style={{width:"70px", height:"70px",objectFit:"cover", borderRadius:"70px"}}  alt="profile avatar"/>
              }
               
              </div>
            </div>
            <div className="col-8 postName d-flex align-items-center">
              <h1>
               
                {/* {post.wallid !== post.userid ? 
                  <span>
                    <Link to={`/profile/${post.wallid}/${post.userid}`}>{post.firstName} {post.lastName}</Link>
                    {" "}
                    &gt; <Link to={`/profile/${post.wallid}`}>{post.wallOwnerFirstName} {post.wallOwnerLastName}{" "}</Link>
                  </span> :

                  <span>
                  <Link to={`/profile/${post.userid}`}>{post.firstName} {post.lastName}</Link>
                  </span>
                } */}

                {/* eslint-disable-next-line */}
                {(post.wallid === post.userid) && (post.userid == userid) ? 
                  <span>
                   <Link to={`/profile/${post.userid}`}>{post.firstName} {post.lastName}</Link>
                  </span> :

                  <span>
                  
                  </span>
                }

                {/* eslint-disable-next-line */}
                {(post.wallid === post.userid) && (post.userid != userid) ? 
                  <span>
                   <Link to={`/profile/${userid}/${post.userid}`}>{post.firstName} {post.lastName}</Link>
                  </span> :

                  <span>
                  
                  </span>
                }

                {/* eslint-disable-next-line */}
                {(post.wallid !== post.userid) && (post.wallid == userid) ? 
                  <span>
                    <Link to={`/profile/${post.wallid}/${post.userid}`}>{post.firstName} {post.lastName}</Link>
                    {" "}
                    &gt; <Link to={`/profile/${post.wallid}`}>{post.wallOwnerFirstName} {post.wallOwnerLastName}{" "}</Link>
                  </span> :

                  <span>
                  
                  </span>
                }

                {/* eslint-disable-next-line */}
                {(post.wallid !== post.userid) && (post.wallid != userid) ? 
                  <span>
                    <Link to={`/profile/${userid}/${post.userid}`}>{post.firstName} {post.lastName}</Link>
                    {" "}
                    &gt; <Link to={`/profile/${userid}/${post.wallid}`}>{post.wallOwnerFirstName} {post.wallOwnerLastName}{" "}</Link>
                  </span> :

                  <span>
                  
                  </span>
                }





                <p><Moment fromNow>{post.date_created}</Moment></p>
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
                      type="button" className="btn border-0"
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
                        onClick={(e) => deleteHandler(e)} type="button" className="btn border-0"  >Delete Post</button>
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
                  <LikeButton commentorid={id} postid={post.postid}/>
                </div>
                <div className="col-6 comment text-center">
                  <div className="row">
                    <div className="col-12 buttons">
                      <button onClick={commentHandler}><p>Comment</p></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 comments">
              <CommentFeed postid={post.postid} counter={counter} id={id}/> 
            </div>
            {
              commenting && (
                <div className="col-12 form-floating form input-group">
                    <input type="text"  hidden name="postid" />
                    <input type="text" style={{borderTopLeftRadius: '2vh',borderBottomLeftRadius: '2vh' }} className="form-control"
                    placeholder="Comment" name="content" onChange={handleCommentInput} value={commentInput}  />
                    <label htmlFor="post">Write a comment</label>
                    <button onClick={writeComment}><i className="bi bi-send" id={post.postid}></i></button>
                </div>
              )
            }
          </div>
        </div>
      ))}
    </>
  );
};

export default HomepageFeedPost;

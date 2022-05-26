import axios from "axios";
import React, { useEffect, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import LikeButton from "./LikeButton";
import OtherCommentFeed from "./OtherCommentFeed";
import Moment from 'react-moment';
import 'moment-timezone';
import { Link } from "react-router-dom";

const OtherProfileFeedPost = (props) => {
  const profileupdater = props.profileupdater;
  // eslint-disable-next-line
  const [commentorid,setCommentorId] = useState(props.commentorid)
  const id = props.userid;
  const origCounter = props.postCounter;
  const [commenting, setCommenting] = useState(false);
  const [posts, setPosts] = useState([]);
  const [notifTrigger, setNotifTrigger] = useState(false);
  const [commentIdAdded, setCommentIdAdded] = useState([]);
  const [postOwner, setPostOwner] = useState([]);
  const [counter, setCounter] = useState(props.postCounter);
  const [formInput, setFormInput] = useState({
    content: "",
  });

  const [commentInput, setCommentInput] = useState();
  const ownerpicpath=props.ownerpicpath



  useEffect(() => {
    axios
      .post("https://serserserver.herokuapp.com/postfeed", {
        userid: id,
      } )
      .then((response) => {
        console.log(response)
        setPosts(response["data"]["array"]);
      });
    // eslint-disable-next-line
  }, [origCounter, counter, profileupdater]);

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
    e.preventDefault();
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
  };

  const saveEditHandler = (e) => {
    e.preventDefault();
    const postid = e.target.id;
    console.log(postid);
    const data = {
      postid: postid,
      content: formInput.content,
    };

    axios
      .post("https://serserserver.herokuapp.com/editpost", data)
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          setCounter(counter + 1);
        }
      });
  };

  const commentHandler = () => {
    setCommenting(true);
  };

  const handleCommentInput = (e) => {
    e.preventDefault();
    setCommentInput(e.target.value);
  };

  const writeComment = (e) => {
    e.preventDefault();
    const postid = e.target.id;
    const data = {
      userid: commentorid,
      postid: postid,
      content: commentInput,
    };

    axios
      .post("https://serserserver.herokuapp.com/addcomment", data)
      .then((res) => {
        if (res.status === 200) {
          console.log(res)
          setCommentIdAdded(res["data"]["array"]["insertId"])
          setPostOwner(postid)
          setNotifTrigger(true)
          setCounter(counter + 1)
          setCommentInput("")
        }
      });
  };

  useEffect(() => {
    axios
      .post("https://serserserver.herokuapp.com/newcommentnotif", {
        userid: commentorid,
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
      {posts.length===0 && <span>This user has no posts yet</span>}
      {posts.map((post, index) => (
        <div className="col-12 post" key={index}>
          <div className="row">
            <div className="col-2">
              <div className="profImage">
              {post.wallid === post.userid ?
              <img src={ownerpicpath} onError={(event) => event.target.src = 'https://eng.asu.edu.eg/img/user.png'}  style={{width:"70px", height:"70px",objectFit:"cover", borderRadius:"70px"}}  alt="profile avatar"/>:
              <img src={post.picpath} onError={(event) => event.target.src = 'https://eng.asu.edu.eg/img/user.png'}  style={{width:"70px", height:"70px",objectFit:"cover", borderRadius:"70px"}}  alt="profile avatar"/>
              }
              </div>
            </div>
            <div className="col-8 postName d-flex align-items-center">
              <h1>
                {/* eslint-disable-next-line  */}
              {(post.wallid === post.userid)? 
                  <span>
                   <Link to={`/profile/${commentorid}/${post.userid}`}>{post.firstName} {post.lastName} </Link>
                  </span> :

                  <span>
                  
                  </span>
                }


                {/* eslint-disable-next-line  */}
                {(post.wallid !== post.userid) && (post.userid != commentorid) ? 
                  <span>
                    <Link to={`/profile/${commentorid}/${post.userid}`}>{post.firstName} {post.lastName}</Link>
                    {" "}
                    &gt; <Link to={`/profile/${commentorid}/${post.wallid}`}>{post.wallOwnerFirstName} {post.wallOwnerLastName}{" "}</Link>
                  </span> :

                  <span>
                  
                  </span>
                }

                {/* eslint-disable-next-line  */}
                {(post.wallid !== post.userid) && (post.userid == commentorid) ? 
                  <span>
                    <Link to={`/profile/${commentorid}`}>{post.firstName} {post.lastName}</Link>
                    {" "}
                    &gt; <Link to={`/profile/${commentorid}/${post.wallid}`}>{post.wallOwnerFirstName} {post.wallOwnerLastName}{" "}</Link>
                  </span> :

                  <span>
                  
                  </span>
                }



                <p><Moment fromNow>{post.date_created}</Moment></p>
              </h1>
            </div>
            <div className="col-2 postSettings">
            {/* eslint-disable-next-line */}
              {commentorid == post.userid && (
                <div className="dropdown text-end">
                  <a
                    className="btn btn-outline-black"
                    href="/#"
                    role="button"
                    id="dropdownMenuLink"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="bi bi-three-dots"></i>
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="dropdownMenuLink"
                  >
                    <li>
                      <div className="dropdown-item" id={post.postid}>
                        <button
                          className="btn border-0"
                          type="button"
                          data-bs-toggle="modal"
                          data-bs-target={`#exampleModal${post.postid}`}
                          id={post.postid}
                        >
                          Edit post
                        </button>
                      </div>
                    </li>
                    <li>
                      <div
                        className="dropdown-item">
                        <button type="button" id={post.postid}
                        onClick={(e) => deleteHandler(e)} className="btn border-0">Delete Post</button>
                      </div>
                    </li>
                  </ul>
                </div>
              )}
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
                          name="content"
                          defaultValue={post.content}
                          onChange={handleInput}
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
                      <button
                        type="button"
                        className="btn btn-primary"
                        data-bs-dismiss="modal"
                        id={post.postid}
                        onClick={saveEditHandler}
                      >
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
                    <LikeButton commentorid={commentorid} postid={post.postid}/>
                </div>
                <div className="col-6 comment text-center">
                  <div className="row">
                    <div className="col-12 buttons">
                      <button onClick={commentHandler}>
                        <p>Comment</p>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
            <div className="col-12 comments">
                <OtherCommentFeed postid={post.postid} counter={counter} id={id} commentorid={commentorid}/> 
            </div>
            {commenting && (
                <div className="col-12 form-floating form input-group">
                  <input type="text" hidden name="postid" />
                  <input
                    type="text"
                    className="form-control"
                    id={post.postid}
                    name="content"
                    onChange={handleCommentInput}
                    placeholder="Comment"
                    style={{borderTopLeftRadius: '2vh',borderBottomLeftRadius: '2vh' }}
                  />
                  <label htmlFor="post">Write a comment</label>
                  <button onClick={writeComment}>
                    <i className="bi bi-send" id={post.postid}></i>
                  </button>
                </div>
              )}
          </div>
        </div>
      ))}
    </>
  );
};

export default OtherProfileFeedPost;

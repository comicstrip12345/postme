import axios from "axios";
import React, { useEffect, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import LikeButton from "./LikeButton";
import OtherCommentFeed from "./OtherCommentFeed";

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



  useEffect(() => {
    axios
      .post("https://serserserver.herokuapp.com/postfeed", {
        userid: id,
      })
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
                        <a
                          href="/#"
                          type="button"
                          data-bs-toggle="modal"
                          data-bs-target={`#exampleModal${post.postid}`}
                          id={post.postid}
                        >
                          Edit post
                        </a>
                      </div>
                    </li>
                    <li>
                      <div
                        className="dropdown-item"
                        id={post.postid}
                        onClick={(e) => deleteHandler(e)}
                      >
                        <a href="#/">Delete Post</a>
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
                <div className="col-12 menu1 text-center">
                    <LikeButton commentorid={commentorid} postid={post.postid}/>
                </div>
                <div className="col-12 menu1 border-top">
                  <button onClick={commentHandler}>
                    <p>Comment</p>
                  </button>
                </div>
              </div>
              {commenting && (
                <div className="COL-12 form-floating form">
                  <button onClick={writeComment}>
                    <i className="bi bi-send" id={post.postid}></i>
                  </button>
                  <input type="text" hidden name="postid" />
                  <input
                    type="text"
                    className="form-control"
                    id={post.postid}
                    name="content"
                    onChange={handleCommentInput}
                    placeholder="Comment"
                  />
                  <label htmlFor="post">Write a comment</label>
                </div>
              )}
              <div className="col-12 comments">
                <OtherCommentFeed postid={post.postid} counter={counter} id={id} commentorid={commentorid}/> 
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default OtherProfileFeedPost;

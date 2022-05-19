import axios from "axios";
import React, { useEffect, useState } from "react";
import CommentFeed from "./CommentFeed";
import 'bootstrap-icons/font/bootstrap-icons.css'

const ProfileFeedPost = (props) => {
  const profileupdater = props.profileupdater;
  const origCounter = props.postCounter;
  const id = props.userid;

  const [counter, setCounter] = useState(props.postCounter);
  const [commenting,setCommenting] = useState(false);
  const [posts, setPosts] = useState([]);
  const [formInput,setFormInput] = useState({
    content:"",
    });

    const [commentInput,setCommentInput] = useState("");


    
    useEffect(() => {
        axios
        .post("https://serserserver.herokuapp.com/postfeed", {
            userid: id,
        })
        .then((response) => {
            console.log(response);
            setPosts(response["data"]["array"]);
        });
        // eslint-disable-next-line
    }, [origCounter, counter, profileupdater,id]);

    const deleteHandler = (e) => {
        const postid = e.target.id;
        console.log(`${postid} id clicked`);

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
    console.log(postid)
     const data = {
         postid: postid,
         content:formInput.content
       
     }

     console.log(data)

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
        console.log(commentInput)

    const writeComment = (e) => {
        e.preventDefault()
        const postid = e.target.id;
    
        const data = {
            userid:id,
            postid:postid,
            content:commentInput
        }

        console.log(data)

        axios.post("https://serserserver.herokuapp.com/addcomment", data ).then((res)=> {
                    if(res.status===200){
                        console.log(res)
                        setCounter(counter + 1)
                        setCommentInput("")
                    }
                }) 
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
                        <a href="#/" >Delete Post</a>
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
                <div className="col-6 menu1">
                  <button>
                      <p>Like</p>
                  </button>
                </div>
                <div className="col-6 menu1">                 
                    <button onClick={commentHandler}><p>Comment</p></button>
                </div>
              </div>

            {
              commenting && (
                <div className="col-12 form-floating form">
                    <button onClick={writeComment}><i className="bi bi-send" id={post.postid}></i></button>
                    <input type="text" hidden name="postid" />
                    <input type="text" className="form-control"
                    placeholder="Comment" name="content" onChange={handleCommentInput} value={commentInput}  />
                    <label htmlFor="post">Write a comment</label>
                </div>
              )
            }
            <div className="col-12 comments">
              <CommentFeed postid={post.postid} counter={counter}/> 
            </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProfileFeedPost;

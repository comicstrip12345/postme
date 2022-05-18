import axios from "axios";
import React, { useEffect, useState } from "react";

const ProfileFeedPost = (props) => {
  const profileupdater = props.profileupdater;
  const [posts, setPosts] = useState([]);
  const origCounter = props.postCounter;
  const [counter, setCounter] = useState(props.postCounter);
  // eslint-disable-next-line
  const id = props.userid;
  const [formInput,setFormInput] = useState({
    content:"",
});

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
  }, [origCounter, counter, profileupdater]);

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
                ></a>

                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuLink"
                >
                  <li>
                    <div className="dropdown-item" id={post.postid}>
                      <button
                        type="button"
                        className="btn btn-outline-dark border-0"
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
                      className="dropdown-item"
                      id={post.postid}
                      onClick={(e) => deleteHandler(e)}
                    >
                      Delete Post
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
                          name="content" defaultValue={post.content}   onChange={handleInput}
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
  );
};

export default ProfileFeedPost;

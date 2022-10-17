import React, { useRef, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import ProfileFeedPost from "./ProfileFeedPost";

const ProfileFeedSettings = (props) => {
  const picpath = props.picpath;
  const userid = props.userid;
  const [post, setPost] = useState();
  const [postCounter, setPostCounter] = useState(1);
  const profileupdater = props.profileupdater;
  const postRef = useRef();

  const submitHandler = () => {
    axios
      .post("http://localhost:5001/newpost", {
        userid: userid,
        post: post,
      })
      .then((response) => {
        console.log(response);
        setPostCounter(postCounter + 1);
        console.log(postCounter);
        postRef.current.value = "";
      });
    console.log(`${userid},${post}`);
  };

  return (
    <>
      <div className="col-12 feed">
        <div className="row">
          <div className="col-2">
            <div className="profImage">
              <img
                src={picpath}
                onError={(event) =>
                  (event.target.src = "https://eng.asu.edu.eg/img/user.png")
                }
                style={{
                  width: "59px",
                  height: "59px",
                  objectFit: "cover",
                  borderRadius: "59px",
                }}
                alt="profile avatar"
              />
            </div>
          </div>
          <div className="col-10 postInput">
            <div className="form-floating form input-group">
              <input
                type="text"
                className="form-control"
                ref={postRef}
                id="post"
                placeholder="text"
                onChange={(e) => {
                  setPost(e.target.value);
                }}
              />
              <label htmlFor="post">Post Something...</label>
              <button onClick={submitHandler}>
                <i className="bi bi-send"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <ProfileFeedPost
        userid={`${userid}`}
        postCounter={postCounter}
        profileupdater={profileupdater}
        picpath={picpath}
      />
    </>
  );
};

export default ProfileFeedSettings;

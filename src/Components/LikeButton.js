import axios from "axios";
import React, { useEffect, useState } from "react";
import LikeFeed from "./LikeFeed";

const LikeButton = (props) => {
  const commentorid = props.commentorid;
  const postid = props.postid;

  const [like, setLike] = useState(false);
  const [likeCounter, setLikeCounter] = useState(1);

  useEffect(
    () => {
      axios
        .post("http://localhost:5001/likesearcher", {
          userid: commentorid,
          postid: postid,
        })
        .then((res) => {
          if (res.data.array.length > 0) {
            setLike(true);
          }
        });
    },
    // eslint-disable-next-line
    []
  );

  const likeHandler = () => {
    console.log(`${commentorid}  ${postid}`);
    axios
      .post("http://localhost:5001/addlike", {
        userid: commentorid,
        postid: postid,
      })
      .then((response) => {
        console.log(response);
        setLike(true);
        addLikeNotif();
        setLikeCounter(likeCounter + 1);
      });
  };

  const addLikeNotif = () => {
    axios
      .post("http://localhost:5001/newlikenotif", {
        userid: commentorid,
        postid: postid,
      })
      .then((response) => {
        console.log(response);
      });
  };

  const unlikeHandler = () => {
    console.log(`${commentorid}  ${postid}`);
    axios
      .post("http://localhost:5001/deletelike", {
        userid: commentorid,
        postid: postid,
      })
      .then((response) => {
        console.log(response);
        setLike(false);
        deleteLikeNotif();
        setLikeCounter(likeCounter + 1);
      });
  };

  const deleteLikeNotif = () => {
    axios
      .post("http://localhost:5001/deletelikenotif", {
        userid: commentorid,
        postid: postid,
      })
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <div className="row">
      <div className="col-6 likesCount">
        <LikeFeed postid={postid} likecounter={likeCounter} />
      </div>
      <div className="col-12 likeButton text-center">
        {!like ? (
          <button onClick={likeHandler}>Like</button>
        ) : (
          <button
            onClick={unlikeHandler}
            className="text-center"
            style={{ color: "#0AA1DD" }}
          >
            Liked
          </button>
        )}
      </div>
    </div>
  );
};

export default LikeButton;

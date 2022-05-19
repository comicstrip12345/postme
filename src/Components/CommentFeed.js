import axios from "axios";
import React, { useEffect, useState } from "react";

const CommentFeed = (props) => {
  const postid = props.postid;
  const counter = props.counter;
  const [comments, setComments] = useState([]);
  const [commentUpdater, setCommentUpdater] = useState(counter);
  const [changeHandler, setChangeHandler] = useState("");

  useEffect(() => {
    axios
      .post("https://serserserver.herokuapp.com/commentfeed", {
        postid: postid,
      })
      .then((response) => {
        setComments(response["data"]["array"]);
      });
  }, [counter, commentUpdater, postid]);

  const deleteCommentHandler = (e) => {
    const commentid = e.target.id;

    axios
      .post("https://serserserver.herokuapp.com/deletecomment", {
        commentid: commentid,
      })
      .then(() => {
        setCommentUpdater(commentUpdater + 1);
      });
  };



  const editChangeHandler = (e) => {
    e.preventDefault();
    setChangeHandler(e.target.value)

  };

  const editComment = (e) => {
    e.preventDefault();
    const commentid = e.target.id;
    console.log(`edit comment executedc ${commentid} ${changeHandler}`)

    axios
      .post("https://serserserver.herokuapp.com/editcomment", {
        commentid: commentid,
        content: changeHandler,
      })
      .then((response) => {
        console.log(response);
        setCommentUpdater(commentUpdater + 1);

      });
  };

  return (
    <>
      {comments.map((comment, index) => (
        <div className="row border" key={index}>
          <p className="text-start">
            {comment.firstName} {comment.lastName}
          </p>
          {comment.content} <br />
          {comment.date_created} <br />
          <div className="row border" key={index}>
            <div
              className="col"
              id={comment.commentid}
            >
              <button
                type="button"
                className="btn btn-outline-dark border-0"
                data-bs-toggle="modal"
                data-bs-target={`#exampleModal${comment.commentid}`}
                id={comment.commentid}
              >
                Edit comment
              </button>
            </div>
            <div
              className="col"
              onClick={deleteCommentHandler}
              id={comment.commentid}
            >
              Delete
            </div>
          </div>
          <div
            className="modal fade"
            id={`exampleModal${comment.commentid}`}
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
                      onChange={editChangeHandler}
                    />
                    <label htmlFor="floatingUsername">Edit Comment</label>
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
                    id={comment.commentid}
                    onClick={editComment}
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CommentFeed;

import axios from "axios";
import React, { useEffect, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import CommentCountFeed from "./CommentCountFeed";

const OtherCommentFeed = (props) => {
  const postid = props.postid;
  // eslint-disable-next-line
  const [id, setId] = useState(props.id);
  // eslint-disable-next-line
  const [commentorid, setCommentorid] = useState(props.commentorid);
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
    setChangeHandler(e.target.value);
  };

  const editComment = (e) => {
    e.preventDefault();
    const commentid = e.target.id;
    console.log(`edit comment executedc ${commentid} ${changeHandler}`);

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
      <div className="row">
        <div className="col-12 commentCount">
          <CommentCountFeed
            postid={postid}
            counter={counter}
            commentUpdater={commentUpdater}
          />
        </div>
      </div>
      {comments.map((comment, index) => (
        <div className="row" key={index}>
          <div className="col-1">
            <div className="profPhoto"></div>
          </div>
          <div className="col-11">
            <div className="row  commentTile">
              <div className="col-9 name">
                <h1>
                  {comment.firstName} {comment.lastName}
                  <span>{comment.date_created}</span>
                </h1>
                <p>{comment.content}</p>
              </div>
              <div className="col-3 settings">
                {/* eslint-disable-next-line  */}
                {comment.id == commentorid && (
                  <>
                    <button
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="bi bi-three-dots"></i>
                    </button>
                    <ul
                      className="dropdown-menu dropdown-menu-end"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <a
                          className="dropdown-item"
                          href="#/"
                          id={comment.commentid}
                          type="button"
                          data-bs-toggle="modal"
                          data-bs-target={`#exampleModal${comment.commentid}`}
                        >
                          Edit
                        </a>
                      </li>

                      <li>
                        <a
                          className="dropdown-item"
                          href="#/"
                          onClick={deleteCommentHandler}
                          id={comment.commentid}
                        >
                          Delete
                        </a>
                      </li>
                    </ul>
                  </>
                )}
              </div>
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

export default OtherCommentFeed;

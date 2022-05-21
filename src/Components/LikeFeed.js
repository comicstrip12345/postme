import axios from "axios";
import React, { useEffect, useState } from "react";

const LikeFeed = (props) => {
  const postid = props.postid;
  const likecounter = props.likecounter
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    axios
      .post("https://serserserver.herokuapp.com/likefeed", {
        postid: postid,
      })
      .then((response) => {
        setLikes(response["data"]["array"]);
      });
    // eslint-disable-next-line
  }, [likecounter]);


  return (
    <>
        <div className="row">
          <div className="col-12 logo">
              {Object.keys(likes).length>0 ? 
                  <a href="#/" data-bs-toggle="modal" data-bs-target= {`#post${postid}`}><img src={require("../images/like.png")} alt="like"/><span> {Object.keys(likes).length}</span></a> : 
                  <span> No likes yet </span>} 
          </div>


          <div
            className="modal fade"
            id={`post${postid}`}
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Who Liked this post?
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>

                
                <div className="modal-body">
                    {likes.map((like,index)=> (
                      <div className="row" key={index}>
                          {like.firstName} {like.lastName}
                      </div>
                    ))}
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  );
};

export default LikeFeed;

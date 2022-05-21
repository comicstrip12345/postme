import axios from "axios";
import React, { useEffect, useState } from "react";

const CommentCountFeed = (props) => {

  const postid = props.postid;
  const counter = props.counter;
  const commentUpdater=props.commentUpdater;
  const origCounter = props.origCounter
  const profileupdater = props.profileupdater
  const [comments, setComments] = useState([]);


  useEffect(() => {
    axios
      .post("https://serserserver.herokuapp.com/commentfeed", {
        postid: postid,
      })
      .then((response) => {
          
          setComments(response["data"]["array"]);
      });
    
      
  }, [counter,origCounter,profileupdater,postid,commentUpdater]);


  return (
    <div>
          {Object.keys(comments).length>1 ? 
                <span> {Object.keys(comments).length} comments</span> : 
                <span> </span>} 

          {Object.keys(comments).length===1 ? 
                <span> {Object.keys(comments).length} comment</span> : 
                <span> </span>} 
        
    </div>
  );
};

export default CommentCountFeed;

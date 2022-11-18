import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Comments from "./Comments";

//Need to add the createdAt property to the mapping
const CommentsList = () => {
  //Comment States
  const [comments, setComments] = useState([]);
  //id here is the journal document id
  const { id } = useParams();

  useEffect(() => {
    const getComment = async () => {
      try {
        const res = await axios.get(
          process.env.REACT_APP_API_URL + `/api/journal/getComments/${id}`,
          {
            withCredentials: true,
          }
        );
        setComments(res.data)
        console.log(comments)
      } catch (err) {
        console.log(err);
      }
    };
    getComment()
  }, []);

  return (
    <div>
        {comments.map((comment) => {
            return (
                <Comments 
                userName={comment.userName}
                comment={comment.comment}
                key={comment._id}
            />
            )
        })}
    </div>
  )
};

export default CommentsList;

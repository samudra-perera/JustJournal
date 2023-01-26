// import axios from "axios";
import axios from '../api/getData'
import React from "react";
import { useParams } from "react-router-dom";
import { useAxios } from "../hooks/useAxios";
import Comments from "./Comments";

//Need to add the createdAt property to the mapping
const CommentsList = () => {
  const { id } = useParams();
  const[comments, error, loading] = useAxios({
    axiosInstance: axios,
    method: 'GET',
    url: `/api/journal/getComments/${id}`,
    requestConfig: {
      withCredentials: true
    }
  })

  return (
    <div>
        {comments.map((comment) => {
            return (
                <Comments 
                userName={comment.userName}
                comment={comment.comment}
                key={comment._id}
                id={comment._id}
            />
            )
        })}
    </div>
  )
};

export default CommentsList;


const Comment = () => {

}
import React, { useState, useEffect } from "react";
// import axios from "axios";
import { useParams } from "react-router-dom";
import axios from '../api/serverConnect'
import {useAxiosFunction} from '../hooks/useAxiosFunction'

//POST Request to 'api/journal/addComment/:id'

const CreateComment = () => {
  //To get the id (passed from Journal Page)
  const { id } = useParams();
  //State for Comment
  const [comment, setComment] = useState('');
  //API Request
  // const createComment = async () => {
  //   try {
  //     const res = await axios.post(
  //       process.env.REACT_APP_API_URL + `/api/journal/addComment/${id}`,
  //       {
  //         comment: comment,
  //       },
  //       {
  //         withCredentials: true,
  //       }
  //     );
  //     console.log(res.data)
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const [comments, error, loading, axiosFetch] = useAxiosFunction()

  //Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    // createComment();
    axiosFetch({
      axiosInstance: axios,
      method: 'POST',
      url: `/api/journal/addComment/${id}`,
      requestConfig: {
        data: {
          comment: comment
        },
        withCredentials: true,
      }
    })
  };

  //Setting State of Comment
  useEffect(() => {
    setComment(comment);
  }, [comment]);

  return (
    <form
      className="p-4 p-md-5 border rounded-3 bg-light"
      onSubmit={handleSubmit}
    >
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          name="comment"
          autoComplete="off"
          onChange={(e) => setComment(e.target.value)}
          required
          placeholder="Write something nice!"
        />
        <label htmlFor="title">Comment</label>
      </div>
      <button className="w-100 btn btn-lg btn-primary" type="submit">
          Create Comment
        </button>
    </form>
  );
};

export default CreateComment;

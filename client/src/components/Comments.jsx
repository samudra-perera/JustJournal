import React from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

const styles = {
  maxWidth: "18rem",
};

const Comments = (props) => {
  const { userName, comment, id } = props; //Destructure Props

  //API Call to delete comments
  const deleteComment = async (id) => {
    try {
      const res = await axios.delete(
        process.env.REACT_APP_API_URL + `/api/journal/deleteComment/${id}`,
        {
          withCredentials: true,
        }
      );
      console.log(res)
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div className="card border-primary mb-3" style={styles} key={id}>
      <div className="card-header">{userName}</div>
      <div className="card-body text-primary">
        <p className="card-text">{comment}</p>
      </div>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => deleteComment(id)}
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  );
};

export default Comments;

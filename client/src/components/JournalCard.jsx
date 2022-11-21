import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

const styles = {
  maxWidth: "18rem",
};

const JournalCard = (props) => {
  const { createdAt, title, posPromptOne, id } = props;

  //Delete functionality works however need to refresh in order to see the update
  const deleteJournal = async (id) => {
    try {
      const res = await axios.delete(
        process.env.REACT_APP_API_URL + `/api/journal/deleteJournal/${id}`, {
          withCredentials: true
        }
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="card border-primary mb-3" style={styles} key={id}>
      <div className="card-header">{createdAt}</div>
      <div className="card-body text-primary">
        <h5 className="card-title">
          <Link to={`/journals/${id}`}>{title}</Link>
        </h5>
        <p className="card-text">{posPromptOne}</p>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => deleteJournal(id)}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
};

export default JournalCard;

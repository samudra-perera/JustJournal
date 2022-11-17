import React from "react";
import { Link } from "react-router-dom";

const styles = {
  maxWidth: "18rem",
};

const JournalCard = (props) => {
  const { createdAt, title, posPromptOne, id } = props;
  return (
    <div className="card border-primary mb-3" style={styles} key={id}>
      <div className="card-header">{createdAt}</div>
      <div className="card-body text-primary">
        <h5 className="card-title">
          <Link to={`/journals/${id}`}>{title}</Link>
        </h5>
        <p className="card-text">{posPromptOne}</p>
      </div>
    </div>
  );
};

export default JournalCard;

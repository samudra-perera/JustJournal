import React from "react";


const styles = {
  maxWidth: "18rem",
};

const Comments = (props) => {
  const { userName, comment, id } = props;
  return (
    <div className="card border-primary mb-3" style={styles} key={id}>
      <div className="card-header">{userName}</div>
      <div className="card-body text-primary">
        <p className="card-text">{comment}</p>
      </div>
    </div>
  );
};

export default Comments;

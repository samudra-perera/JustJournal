import React, { useEffect, useState } from "react";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import JournalCard from "./JournalCard";

const JournalList = (props) => {
  const {propID} = props
  let userID = useOutletContext()
  const [data, setData] = useState([]);
  console.log(userID)

  useEffect(() => {
    if(!userID) {
      userID = propID
    }
    const getFeed = async () => {
      try {
        const res = await axios.get(
          process.env.REACT_APP_API_URL + `/dashboard/${userID}`,
          {
            withCredentials: true,
          }
        );
        console.log(res.data);
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFeed();
  }, []);

  return (
    <div>
      {data.map((journal) => {
        return (
          <JournalCard
            createdAt={journal.createdAt}
            title={journal.title}
            posPromptOne={journal.posPromptOne}
            key={journal._id}
            id={journal._id}
          />
        );
      })}
    </div>
  );
};

export default JournalList;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CommentsList from "../components/CommentsList";
import CreateComment from "../components/CreateComment";
import JournalImages from "../components/JournalImages";

//GET Request to server in order to get the Journal Contents

const JournalPage = () => {
  //States for the data to be stored from the API call
  const [journal, setJournal] = useState([]);
  const [user, setUser] = useState([])
  // id of the journals taken from the parameters
  const { id } = useParams();
  
  //API call to get a single journal page
  useEffect(() => {
    const getJournal = async () => {
      try {
        const res = await axios.get(
          process.env.REACT_APP_API_URL + `/api/journal/${id}`,
          {
            withCredentials: true,
          }
        );
        setJournal(res.data.journal);
        setUser(res.data.user)
        console.log(res.data.journal)
      } catch (err) {
        console.log(err);
      }
    };
    getJournal();
  }, []);
  console.log(journal)

  return (
    <div>
      <h3>{journal.title}</h3>
      <span>{journal.createdAt}</span>
      <span> By: {user.userName}</span>
      <p>{journal.posPromptOne}</p>
      <p>{journal.posPromptTwo}</p>
      <p>{journal.posPromptThree}</p>
      <p>{journal.improvPrompt}</p>
      <JournalImages props={journal.imageURL}/>
      <CreateComment id={id}/>
      <CommentsList />
    </div>
  );
};

export default JournalPage;

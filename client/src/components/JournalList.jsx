//This component is the component housing the list of Journal entries as card components
import React from "react";
import axios from '../api/serverConnect'
import { useAxios } from "../hooks/useAxios";
import { useOutletContext } from "react-router-dom";
import JournalCard from "./JournalCard";

const JournalList = (props) => {
  const {propID} = props
  let userID = useOutletContext()

  if(!userID) {
    userID = propID
  }
  const [journals, error, loading] = useAxios({
    axiosInstance: axios,
    method: 'GET',
    url: `/dashboard/${userID}`,
    requestConfig: {
      withCredentials: true
    }
  })

  return (
    <div>
      {journals.map((journal) => {
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

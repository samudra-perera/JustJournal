import React from "react";
import { useParams } from "react-router-dom";
import CommentsList from "../components/CommentsList";
import CreateComment from "../components/CreateComment";
import JournalImages from "../components/JournalImages";
import Nav from "../components/Nav";
import axios from "../api/serverConnect";
import { useAxios } from "../hooks/useAxios";
import FavouritesButton from "../components/FavouritesButton";
import RemoveFavourites from "../components/RemoveFavourites";

const JournalPage = () => {
  const { id } = useParams();
  const [journal, error, loading] = useAxios({
    axiosInstance: axios,
    method: "GET",
    url: `/api/journal/${id}`,
    requestConfig: {
      withCredentials: true,
    },
  });

  if (journal.journal == undefined) {
    return;
  } else {
    return (
      <div>
        <Nav />
        <h3>{journal.journal.title}</h3>
        <span>{journal.journal.createdAt}</span>
        <span> By: {journal.user.userName}</span>
        <p>{journal.journal.posPromptOne}</p>
        <p>{journal.journal.posPromptTwo}</p>
        <p>{journal.journal.posPromptThree}</p>
        <p>{journal.journal.improvPrompt}</p>
        <JournalImages props={journal.journal.imageURL} />
        <CreateComment id={id} />
        <CommentsList />
        {!journal.profile.includes(id) ? <FavouritesButton id={id} /> : <RemoveFavourites id={id} />}
      </div>
    );
  }
};

export default JournalPage;

import React from "react";
import JournalList from "../components/JournalList";
import Profile from "../components/Profile";
import { useParams } from "react-router-dom";
import axios from "axios";
//This functional component is to view other user's profiles that you will be sent here via click
// This page will display the user's followers, the user's journals if any are public and the num of Journals

const ProfilePage = () => {
  const { id } = useParams();
  return (
    <div>
      <Profile userID={id} />
      This is the profile page to be of the mans
      <JournalList propID={id} />
    </div>
  );
};

export default ProfilePage;

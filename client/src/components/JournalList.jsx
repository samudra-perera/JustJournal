//This component is the component housing the list of Journal entries as card components
import React from "react";
import axios from "../api/serverConnect";
import { useAxios } from "../hooks/useAxios";
import { useOutletContext } from "react-router-dom";
import { Heading, SimpleGrid, Text } from "@chakra-ui/react";
import JournalCard from "./JournalCard";

const JournalList = (props) => {
  const { propID } = props;
  let userID = useOutletContext();

  if (!userID) {
    userID = propID;
  }
  const [data, error, loading] = useAxios({
    axiosInstance: axios,
    method: "GET",
    url: `/dashboard/${userID}`,
    requestConfig: {
      withCredentials: true,
    },
  });
  // console.log(data.profile[0].imageURL);

  //Add a section to display if the user has no Journal available for display (no journals have been created yet)
  if (loading) {
    return <>Loading</>;
  } else {
    return (
      <>
        <Heading>Journals</Heading>
        <SimpleGrid minChildWidth="250px" spacing={10}>
          {data.journal &&
            data.journal.map((journal) => {
              return (
                <JournalCard
                  createdAt={journal.createdAt}
                  title={journal.title}
                  posPromptOne={journal.posPromptOne}
                  key={journal._id}
                  id={journal._id}
                  firstName={data.profile[0].firstName}
                  lastName={data.profile[0].lastName}
                  profileImage={data.profile[0].imageURL}
                />
              );
            })}
        </SimpleGrid>
      </>
    );
  }
};

export default JournalList;

import React from "react";
import { useAxios } from "../hooks/useAxios";
import axios from "../api/serverConnect";
import { useOutletContext } from "react-router-dom";
import { Heading, SimpleGrid } from "@chakra-ui/react";
import JournalCard from "./JournalCard";

const FavouriteJournals = () => {
  const userID = useOutletContext();
  const [data, error, loading] = useAxios({
    axiosInstance: axios,
    method: "GET",
    url: `/api/journal/getFav/${userID}`,
    requestConfig: {
      withCredentials: true,
    },
  });

  console.log(data);
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

export default FavouriteJournals;

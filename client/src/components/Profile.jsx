//This component contains the profile section of the user
import React from "react";
import { useAxios } from "../hooks/useAxios";
import axios from "../api/serverConnect";
import { Link } from "react-router-dom";
import FollowButton from "./FollowButton";
import { Avatar, Box, Center, Flex, Heading, Spacer } from "@chakra-ui/react";

const Profile = (props) => {
  const { userID } = props;
  //Requesting the profile information
  const [profile, error, loading] = useAxios({
    axiosInstance: axios,
    method: "GET",
    url: `/getProfile/${userID}`,
    requestConfig: {
      withCredentials: true,
    },
  });
  //Requesting the loggedIn user information
  const [loggedInID] = useAxios({
    axiosInstance: axios,
    method: "GET",
    url: `/loggedInUser`,
    requestConfig: {
      withCredentials: true,
    },
  });
  // console.log(profile)
  if (profile.profiles === undefined) {
    return;
  } else {
    return (
      <>
        <Center py={6}>
          <Box
            maxW="500px"
            w="full"
            rounded="xl"
            p={6}
            textAlign="center"
            border="1px"
            borderColor="gray.200"
          >
            <Avatar src={profile.profiles.imageURL} size="2xl" mb={6} />
            <Heading as="h3" size={"lg"}>
              {profile.profiles.firstName} {profile.profiles.lastName}
            </Heading>
            <Flex mt={4}>
              <Link to={`followers/${profile.profiles._id}`}>
                Followers: {profile.profiles.followers.length}
              </Link>
              <Spacer />
              <Link to={`following/${profile.profiles._id}`}>
                Following: {profile.profiles.following.length}
              </Link>
              <Spacer />
              <Link to={`followers/${profile.profiles._id}`}>
                Entries: {profile.numOfJournals}
              </Link>
            </Flex>
          </Box>
        </Center>
      </>
    );
  }
};

export default Profile;

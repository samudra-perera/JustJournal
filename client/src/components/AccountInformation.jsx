import React from "react";
import { useAxios } from "../hooks/useAxios";
import axios from "../api/serverConnect";
import { Stack, Text, Box } from "@chakra-ui/react";

const AccountInformation = () => {
  const [user, error, loading] = useAxios({
    axiosInstance: axios,
    method: "GET",
    url: `/api/profile/getUser`,
    requestConfig: {
      withCredentials: true,
    },
  });
  console.log(user);
  return (
    <>
      <Stack spacing={2}>
        <Box>
          <Text fontSize="md" as='b'>Username: </Text>
          <Text fontSize="md">{user.userName}</Text>
        </Box>
        <Box>
          <Text fontSize="md" as='b'>Email: </Text>
          <Text fontSize="md">{user.email}</Text>
        </Box>
      </Stack>
    </>
  );
};

export default AccountInformation;

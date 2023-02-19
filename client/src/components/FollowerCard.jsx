import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Text, Avatar, Flex } from "@chakra-ui/react";
import { useAxios } from "../hooks/useAxios";
import axios from "../api/serverConnect";

const FollowerCard = (props) => {
  const { user } = props;
  const [userInfo, error, loading] = useAxios({
    axiosInstance: axios,
    method: "GET",
    url: `/api/profile/userInfo/${user}`,
    requestConfig: {
      withCredentials: true,
    },
  });

  return (
    <>
      <Card>
        <CardBody>
          <Flex>
            <Avatar src={userInfo.profilePic} />
            <Link to={`/profiles/${user}`}>
              <Text>{userInfo.userName}</Text>
            </Link>
          </Flex>
        </CardBody>
      </Card>
    </>
  );
};

export default FollowerCard;

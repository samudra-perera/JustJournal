import React from "react";
import { Button } from "@chakra-ui/react";
import axios from "axios";

const RemoveFavourites = (prop) => {
  const { id } = prop;
  const removeFavs = async () => {
    try {
      const res = await axios.put(
        process.env.REACT_APP_API_URL + `/api/journal/removeFav/${id}`,
        {
          _id: id,
        },
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Button onClick={removeFavs}>Remove</Button>
    </>
  );
};

export default RemoveFavourites;

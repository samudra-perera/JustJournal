import { Button } from "@chakra-ui/react";
import axios from "axios";
import React from "react";

const FavouritesButton = (prop) => {
  const { id } = prop;
  const addFavs = async () => {
    try {
      const res = await axios.put(
        process.env.REACT_APP_API_URL + `/api/journal/addFav/${id}`,
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
  console.log(id);
  return (
    <>
      <Button onClick={addFavs}>Add</Button>
    </>
  );
};

export default FavouritesButton;

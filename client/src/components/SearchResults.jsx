import React from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import axios from "axios";

const SearchResults = () => {
  //useLocation is used to take in the date sent from the searchbar via useNavigate()
  const { state } = useLocation();
  //id is taken from useOutletContext
  const id = useOutletContext();

  //Timeout is called to allow the component to not call the search request on render
  const timeOut = setTimeout(() => {
    const getSearch = async () => {
      try {
        const res = await axios.get(
          process.env.REACT_APP_API_URL +
            `/api/journal/search/${id}?search=${state}`,
          {
            withCredentials: true,
          }
        );
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    getSearch();
  }, 1000);
  return <div>SearchResults</div>;
};

export default SearchResults;

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Box,
  Flex,
  HStack,
  Text,
} from "@chakra-ui/react";
import { CloseIcon, EditIcon } from "@chakra-ui/icons";

const styles = {
  maxWidth: "18rem",
};

const JournalCard = (props) => {
  const { createdAt, title, posPromptOne, id } = props;

  //Delete functionality works however need to refresh in order to see the update
  const deleteJournal = async (id) => {
    try {
      const res = await axios.delete(
        process.env.REACT_APP_API_URL + `/api/journal/deleteJournal/${id}`,
        {
          withCredentials: true,
        }
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card key={id}>
      <CardHeader>
        <Flex>
          <Box p={2}>
            <Text>AV</Text>
          </Box>
          <Box p={2}>
            <Link to={`/journals/${id}`}>
              <Text>{title}</Text>
            </Link>
          </Box>
        </Flex>
      </CardHeader>
      <CardBody color="gray.500">
        <Text>{posPromptOne}</Text>
      </CardBody>
      <CardFooter>
        <HStack>
          <Button
            colorScheme="red"
            onClick={() => {
              deleteJournal(id);
            }}
            leftIcon={<CloseIcon />}
            variant="ghost"
          >
            Delete
          </Button>
          <Link to={`/dashboard/updateJournal/${id}`}>
            <Button leftIcon={<EditIcon />} variant="ghost">
              Update
            </Button>
          </Link>
        </HStack>
      </CardFooter>
    </Card>
    // <div className="card border-primary mb-3" style={styles} key={id}>
    //   <div className="card-header">{createdAt}</div>
    //   <div className="card-body text-primary">
    //     <h5 className="card-title">
    //       <Link to={`/journals/${id}`}>{title}</Link>
    //     </h5>
    //     <p className="card-text">{posPromptOne}</p>
    //     <button
    //       type="button"
    //       className="btn btn-primary"
    // onClick={() => {
    //   console.log(id)
    //   deleteJournal(id)
    // }}
    //     >
    //       <FontAwesomeIcon icon={faTrash} />
    //     </button>
    //     <h5 className="card-title">
    //       <Link to={`/dashboard/updateJournal/${id}`}>Update</Link>
    //     </h5>
    //   </div>
    // </div>
  );
};

export default JournalCard;

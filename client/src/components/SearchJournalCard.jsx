import React from "react";
import { Link } from "react-router-dom";
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
  Heading,
  Image,
} from "@chakra-ui/react";
import { CloseIcon, EditIcon } from "@chakra-ui/icons";

const styles = {
  maxWidth: "18rem",
};

const SearchJournalCard = (props) => {
  const {
    title,
    posPromptOne,
    id,
  } = props;

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
            <Link to={`/journals/${id}`}>
              <Heading as="h3" size="sm">
                {title}
              </Heading>
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
  );
};

export default SearchJournalCard;

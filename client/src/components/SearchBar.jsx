import React, { useState } from "react";
import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
} from "@chakra-ui/react";

import { Link, useNavigate } from "react-router-dom";

const SearchBar = () => {
  //Setting the state of the search params
  const [search, setSearch] = useState("");
  //useDisclosure is the custom hook that handles the modal in ChakraUI
  const { isOpen, onOpen, onClose } = useDisclosure();
  //Navigate is going to be used once the search state is set and the button is clicked
  const navigate = useNavigate();

  //On the search submission route to the search component and send along the search query as well
  const clickHandler = () => {
    navigate('/dashboard/searchResults', {state: search})
    onClose()
  }

  return (
    <>
      <Link onClick={onOpen}>Search</Link>

      <Modal closeOnOverlayClick={true} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Search</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Input type='text' placeholder="Search journals or users" name="search" onChange={(e)=>setSearch(e.target.value)}></Input>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={clickHandler}>
              Search
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SearchBar;

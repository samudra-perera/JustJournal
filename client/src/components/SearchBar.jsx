import React, {useState} from 'react'
import { useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Input } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const SearchBar = () => {
    const [search, setSearch] = useState('')
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
      <>
        <Link onClick={onOpen}>Search</Link>
  
        <Modal closeOnOverlayClick={true} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Search</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Input></Input>
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Search
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
}

export default SearchBar
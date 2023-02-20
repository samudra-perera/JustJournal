import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import {
  Box,
  Button,
  Textarea,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import HomeNav from "../components/HomeNav";

const ProfileCreation = () => {
  //Setting the states (Turn into objects and reduce code clutter)
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    bio: "",
  });
  //FIle States
  const [file, setFile] = useState("");
  const [image, setImage] = useState("");

  //CreateProfile API
  const createProfile = async () => {
    try {
      const res = await axios.post(
        process.env.REACT_APP_API_URL + "/createProfile",
        {
          firstName: user.firstName,
          lastName: user.lastName,
          bio: user.bio,
          image: image,
        },
        {
          withCredentials: true,
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  //Submit handler
  const handleSubmit = (e) => {
    createProfile();
  };

  //Helper function to set the image as a URL to send as a req.body instead of req.file
  // This one is a bit different than the createJournal since it is a single image.
  //Just get the file name from the state
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImage(reader.result);
    };
    console.log(image);
  };

  //Setting the state of the inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => {
      return { ...prev, [name]: value };
    });
  };

  useEffect(() => {
    setFile(file);
  }, [file]);

  //Validation for the Character limits of the Journal
  const charLimit = (str, num) => {
    console.log(str.length);
    if (str.length > num) {
      return `The maximum allowable characters is ${num} characters`;
    }
  };

  //Style for the anchor tag (Link)
  const style = {
    color: "purple",
  };

  //Responsive font sizing
  const fontSize = { base: "xs", sm: "sm", md: "med", lg: "large" };

  return (
    <>
      <HomeNav />
      <Flex
        align="center"
        justify="center"
        bgImg={
          "https://res.cloudinary.com/dkrjwbr8w/image/upload/v1676418486/Doubs_foubci.png"
        }
        height="92vh"
        bgSize="3000px"
        bgPosition="center"
      >
        <Box bg="white" rounded="xl" w={[300, 400, 500]} p={[6, 9, 12]}>
          <Formik initialValues={user} onSubmit={handleSubmit}>
            {({ handleSubmit, errors, touched }) => (
              <Form onSubmit={handleSubmit}>
                <VStack spacing={4} align="flex-start">
                  <FormControl
                    isRequired="true"
                    isInvalid={!!errors.firstName && touched.firstName}
                  >
                    <FormLabel htmlFor="firstName" fontSize={fontSize}>
                      First Name
                    </FormLabel>
                    <Field
                      as={Input}
                      id="firstName"
                      name="firstName"
                      type="text"
                      variant="filled"
                      onChange={handleChange}
                      value={user.firstName}
                      validate={() => charLimit(user.firstName, 30)}
                    />
                    <FormErrorMessage>{errors.firstName}</FormErrorMessage>
                  </FormControl>
                  <FormControl isRequired="true" isInvalid={!!errors.lastName && touched.lastName}>
                    <FormLabel htmlFor="lastName" fontSize={fontSize}>
                      Last Name
                    </FormLabel>
                    <Field
                      as={Input}
                      id="lastName"
                      name="lastName"
                      type="text"
                      variant="filled"
                      onChange={handleChange}
                      value={user.lastName}
                      validate={() => charLimit(user.lastName, 30)}
                    />
                    <FormErrorMessage>{errors.lastName}</FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={!!errors.bio && touched.bio}>
                    <FormLabel htmlFor="bio" fontSize={fontSize}>
                      Bio
                    </FormLabel>
                    <Field
                      as={Textarea}
                      id="bio"
                      name="bio"
                      type="text"
                      variant="filled"
                      onChange={handleChange}
                      value={user.bio}
                      validate={() => charLimit(user.bio, 150)}
                    />
                    <FormErrorMessage>{errors.bio}</FormErrorMessage>
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="email" fontSize={fontSize}>
                      Profile Picture
                    </FormLabel>
                    <Field
                      as={Input}
                      id="bio"
                      name="bio"
                      type="file"
                      accept="image/png, image/jpeg, image/jpg, image/PNG"
                      onChange={(e) => {
                        setFile(e.target.files[0]);
                        previewFile(e.target.files[0]);
                      }}
                    />
                  </FormControl>
                  <Button
                    type="submit"
                    bg="purple.400"
                    w="full"
                    color="white"
                    variant="solid"
                  >
                    Create Profile
                  </Button>
                </VStack>
              </Form>
            )}
          </Formik>
        </Box>
      </Flex>
    </>
  );
};

export default ProfileCreation;

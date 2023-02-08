import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";

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

  return (
    <>
      <Flex bg="gray.100" align="center" justify="center" h="100vh">
        <Box bg="white" p={6} rounded="md" w={80}>
          <Formik initialValues={user} onSubmit={handleSubmit}>
            {({ handleSubmit, errors, touched }) => (
              <Form onSubmit={handleSubmit}>
                <VStack spacing={4} align="flex-start">
                  <FormControl>
                    <FormLabel htmlFor="email">First Name</FormLabel>
                    <Field
                      as={Input}
                      id="firstName"
                      name="firstName"
                      type="text"
                      variant="filled"
                      onChange={handleChange}
                      value={user.firstName}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="email">Last Name</FormLabel>
                    <Field
                      as={Input}
                      id="lastName"
                      name="lastName"
                      type="text"
                      variant="filled"
                      onChange={handleChange}
                      value={user.lastName}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="email">Bio</FormLabel>
                    <Field
                      as={Input}
                      id="bio"
                      name="bio"
                      type="text"
                      variant="filled"
                      onChange={handleChange}
                      value={user.bio}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="email">Profile Picture</FormLabel>
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
                  <Button type="submit" colorScheme="green" w="full">
                    Create Profile
                  </Button>
                </VStack>
              </Form>
            )}
          </Formik>
        </Box>
      </Flex>
      <div>
        <form
          className="p-4 p-md-5 border rounded-3 bg-light"
          onSubmit={handleSubmit}
        >
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              name="firstName"
              autoComplete="off"
              onChange={handleChange}
              required
              placeholder="Enter Positive Prompt 1"
            />
            <label htmlFor="username">First Name</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              name="lastName"
              autoComplete="off"
              onChange={handleChange}
              required
              placeholder="Enter Positive Prompt 2"
            />
            <label htmlFor="username">Last Name</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              name="bio"
              autoComplete="off"
              onChange={handleChange}
              placeholder="Enter Positive Prompt 3"
            />
            <label htmlFor="username">Bio</label>
          </div>
          <div className="mb-3">
            <label htmlFor="imgUpload" className="form-label">
              Profile Picture
            </label>
            <input
              className="form-control form-control-sm"
              id="imageUpload"
              type="file"
              name="file"
              accept="image/png, image/jpeg, image/jpg, image/PNG"
              onChange={(e) => {
                setFile(e.target.files[0]);
                previewFile(e.target.files[0]);
              }}
            />
          </div>
          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Create Profile
          </button>
        </form>
      </div>
    </>
  );
};

export default ProfileCreation;

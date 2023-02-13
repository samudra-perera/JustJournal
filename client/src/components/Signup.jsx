import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik, Field, Form } from "formik";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";

//The signup page is gonna send the data for the user Schema and the profile Schema
//In a seperate page within the dashboard the user will be able to add things to their profile ie bio, picture etc

//Password validation function to force the inputs on the frontend
// Between 8-32 characters, One letter, one lower and uppercase letter, One number
const passwordValidation = (password) => {
  const theLength = /.{8,32}/
  const numberCase = /[0-9]/
  const lowerCase = /[a-z]/
  const upperCase = /[A-Z]/
  if(!theLength.test(password)) {
    return "Password Needs to be between 8 and 32 characters"
  } else if (!numberCase.test(password)) {
    return "Password needs to contain one number"
  } else if (!lowerCase.test(password)) {
    return "Password needs one lowercase letter"
  } else if (!upperCase.test(password)) {
    return "Password needs one uppercase letter"
  }
}

const Signup = () => {
  //Signup States
  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
    matchPassword: "",
  });

  const navigate = useNavigate();
  //createUser API Request
  const createUser = async () => {
    try {
      const res = await axios.post(
        process.env.REACT_APP_API_URL + "/signup",
        {
          email: user.email,
          userName: user.username,
          password: user.password,
          confirmPassword: user.matchPassword,
        },
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      //If the respose has user added
      //When the sign up is completed send the user to the profile creation page
      // navigate("/profile");
      if (res.data.status === 200) {
        navigate("/createProfile");
      }
    } catch (err) {
      console.log(err);
      //If the sign up does not pass send the user back to the signup page with an error of the issue (ie: user already exists etc;)
      // navigate('/signup')
      navigate("/signup");
    }
  };

  //Submit Handler
  const handleSubmit = (e) => {
    createUser();
  };

  //Setting the state of the input object
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => {
      return { ...prev, [name]: value };
    });
  };

  //Sending the POST request

  return (
      <Flex bg="gray.100" align="center" justify="center" h="100vh">
        <Box bg="white" p={6} rounded="md" w={80}>
          <Formik initialValues={user} onSubmit={handleSubmit}>
            {({ handleSubmit, errors, touched }) => (
              <Form onSubmit={handleSubmit}>
                <VStack spacing={4} align="flex-start">
                  <FormControl isRequired='true'>
                    <FormLabel htmlFor="email">Email Address</FormLabel>
                    <Field
                      as={Input}
                      id="email"
                      name="email"
                      type="email"
                      variant="filled"
                      onChange={handleChange}
                      value={user.email}
                    />
                  </FormControl>
                  <FormControl isRequired='true' isInvalid={!!errors.username && touched.username}>
                    <FormLabel htmlFor="email">Username</FormLabel>
                    <Field
                      as={Input}
                      id="username"
                      name="username"
                      type="text"
                      variant="filled"
                      onChange={handleChange}
                      value={user.username}
                      validate={() => {
                        if(user.username.length > 20 || user.username.length < 5) {
                          return "Please enter a username between 5 and 20 characters"
                        }
                      }}
                    />
                    <FormErrorMessage>{errors.username}</FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={!!errors.password && touched.password}
                    isRequired='true'
                  >
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Field
                      as={Input}
                      id="password"
                      name="password"
                      type="password"
                      variant="filled"
                      validate={() => {
                        return passwordValidation(user.password)
                        }}
                      onChange={handleChange}
                      value={user.password}
                    />
                    <FormErrorMessage>{errors.password}</FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={!!errors.matchPassword && touched.matchPassword}
                    isRequired='true'
                  >
                    <FormLabel htmlFor="matchPassword">Confirm Password</FormLabel>
                    <Field
                      as={Input}
                      id="matchPassword"
                      name="matchPassword"
                      type="password"
                      variant="filled"
                      validate={() => {
                        if (user.matchPassword !== user.password) {
                          return "Passwords do not match, please try again"
                        }
                      }}
                      onChange={handleChange}
                      value={user.matchPassword}
                    />
                    <FormErrorMessage>{errors.matchPassword}</FormErrorMessage>
                  </FormControl>
                  <Button type="submit" colorScheme="green" w="full">
                    Sign up
                  </Button>
                  <small className="text-muted">
                    Already have an account? Click <Link to="/">Here</Link> to
                    go back!
                  </small>
                </VStack>
              </Form>
            )}
          </Formik>
        </Box>
      </Flex>
  );
};

export default Signup;

import axios from "axios";
import React, { useState, useEffect } from "react";
import LandingAside from "./LandingAside";
import { useNavigate, Link } from "react-router-dom";
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
  Text,
  VStack,
} from "@chakra-ui/react";

const Login = () => {
  //user states
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  //API Request for login
  const postLogin = async () => {
    try {
      const res = await axios.post(
        process.env.REACT_APP_API_URL + "/login",
        {
          email: user.email,
          password: user.password,
        },
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      if (res.data.status === 200) {
        navigate("/dashboard");
      }
    } catch (err) {
      console.log(err);
      navigate("/");
    }
  };

  const handleSubmit = () => {
    postLogin();
  };

  //Setting the state of the input object
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => {
      return { ...prev, [name]: value };
    });
  };

  //Style for the anchor tag (Link)
  const style = {
    color: "purple",
  };

  //Responsive font sizing
  const fontSize = { base: "xs", sm: "sm", md: "med", lg: "large" };

  return (
    <>
      <Flex
        align="center"
        justify="center"
        bgImg={
          "https://res.cloudinary.com/dkrjwbr8w/image/upload/v1676418486/Doubs_foubci.png"
        }
        height="92vh"
        bgSize="3000px"
        bgPosition="right"
      >
        <Box bg="white" rounded="xl" w={[300, 400, 500]} p={[6, 9, 12]}>
          <Formik initialValues={user} onSubmit={handleSubmit}>
            {({ handleSubmit, errors, touched }) => (
              <Form onSubmit={handleSubmit}>
                <VStack spacing={4} align="flex-start">
                  <FormControl isRequired="true" >
                    <FormLabel htmlFor="email" fontSize={fontSize}>Email Address</FormLabel>
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
                  <FormControl
                    isInvalid={!!errors.password && touched.password}
                    isRequired="true"
                  >
                    <FormLabel htmlFor="password" fontSize={fontSize}>Password</FormLabel>
                    <Field
                      as={Input}
                      id="password"
                      name="password"
                      type="password"
                      variant="filled"
                      validate={() => {
                        if (user.password.length < 8) {
                          return "Password Needs to be a 8 or more characters";
                        }
                      }}
                      onChange={handleChange}
                      value={user.password}
                    />
                    <FormErrorMessage>{errors.password}</FormErrorMessage>
                  </FormControl>
                  <Field
                    as={Checkbox}
                    id="rememberMe"
                    name="rememberMe"
                    colorScheme="green"
                  >
                    Remember me?
                  </Field>
                  <Button
                    type="submit"
                    bg="purple.400"
                    w="full"
                    color="white"
                    variant="solid"
                  >
                    Login
                  </Button>
                  <Text fontSize="xs">
                    Don't have an account? Click{" "}
                    <Link to="/signup" style={style}>
                      <strong>here</strong>{" "}
                    </Link>
                    to make one!.
                  </Text>
                </VStack>
              </Form>
            )}
          </Formik>
        </Box>
      </Flex>
    </>
  );
};

export default Login;

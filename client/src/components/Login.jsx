import axios from "axios";
import React, { useState, useEffect } from "react";
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

  const handleSubmit = (e) => {
    postLogin();
  };

  //Setting the state of the input object
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <Flex bg="gray.100" align="center" justify="center">
      <Box bg="white" p={6} rounded="md" w='500px'>
        <Formik initialValues={user} onSubmit={handleSubmit}>
          {({ handleSubmit, errors, touched }) => (
            <Form onSubmit={handleSubmit}>
              <VStack spacing={4} align="flex-start">
                <FormControl>
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
                <FormControl isInvalid={!!errors.password && touched.password}>
                  <FormLabel htmlFor="password">Password</FormLabel>
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
                <Button type="submit" colorScheme="green" w="full">
                  Login
                </Button>
                <small className="text-muted">
                  Don't have an account? Click <Link to="/signup">Sign up </Link>
                  to make one!.
                </small>
              </VStack>
            </Form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
};

export default Login;


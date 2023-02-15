import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";

const CreateJournal = () => {
  //States for the form inputs
  const [data, setData] = useState({
    title: "",
    promptOne: "",
    promptTwo: "",
    promptThree: "",
    improvement: "",
    isPublic: "0",
    dayRating: "",
    date: "",
  });
  //States for image files
  const [file, setFile] = useState("");
  const [image, setImage] = useState([]);
  console.log(data.date);
  console.log(typeof data.date);

  //Navigation Var
  const navigate = useNavigate();

  //createJournal API Request
  const createJournal = async () => {
    try {
      const res = await axios.post(
        process.env.REACT_APP_API_URL + "/api/journal/createJournal",
        {
          image: image,
          title: data.title,
          posPromptOne: data.promptOne,
          posPromptTwo: data.promptTwo,
          posPromptThree: data.promptThree,
          improvPrompt: data.improvement,
          isPublic: data.isPublic,
          dayRating: data.dayRating,
          date: data.date,
        },
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  //Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    createJournal();
  };

  //Helper function to set the image as a URL to send as a req.body instead of req.file
  const previewFile = (file, index) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImage([...image, reader.result]);
    };
    console.log(image);
  };

  //Setting the state of the input object
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  useEffect(() => {
    setFile(file);
  }, [file]);

  //Style for the anchor tag (Link)
  const style = {
    color: "purple",
  };

  //Responsive font sizing
  const fontSize = { base: "xs", sm: "sm", md: "med", lg: "large" };

  return (
    <>
      <Box bg="white" rounded="xl" w="100%" p={[6, 9, 12]}>
        <Formik initialValues={data} onSubmit={handleSubmit}>
          {({ handleSubmit, errors, touched }) => (
            <Form onSubmit={handleSubmit}>
              <VStack spacing={4} align="flex-start">
                <FormControl isRequired="true">
                  <FormLabel htmlFor="Title" fontSize={fontSize}>
                    Title
                  </FormLabel>
                  <Field
                    as={Input}
                    id="title"
                    name="title"
                    type="text"
                    variant="filled"
                    onChange={handleChange}
                    value={data.title}
                  />
                </FormControl>
                <FormControl isRequired="true">
                  <FormLabel htmlFor="promptOne" fontSize={fontSize}>
                    Positive #1
                  </FormLabel>
                  <Field
                    as={Textarea}
                    id="promptOne"
                    name="promptOne"
                    type="text"
                    variant="filled"
                    onChange={handleChange}
                    value={data.promptOne}
                    // validate={() => {
                    //   if (
                    //     user.username.length > 20 ||
                    //     user.username.length < 5
                    //   ) {
                    //     return "Please enter a username between 5 and 20 characters";
                    //   }
                    // }}
                  />
                  <FormErrorMessage>{errors.promptOne}</FormErrorMessage>
                </FormControl>
                <FormControl isRequired="true">
                  <FormLabel htmlFor="promptTwo" fontSize={fontSize}>
                    Positive #2
                  </FormLabel>
                  <Field
                    as={Textarea}
                    id="promptTwo"
                    name="promptTwo"
                    type="text"
                    variant="filled"
                    onChange={handleChange}
                    value={data.promptTwo}
                    // validate={() => {
                    //   if (
                    //     user.username.length > 20 ||
                    //     user.username.length < 5
                    //   ) {
                    //     return "Please enter a username between 5 and 20 characters";
                    //   }
                    // }}
                  />
                  <FormErrorMessage>{errors.promptTwo}</FormErrorMessage>
                </FormControl>
                <FormControl isRequired="true">
                  <FormLabel htmlFor="promptThree" fontSize={fontSize}>
                    Positive #3
                  </FormLabel>
                  <Field
                    as={Textarea}
                    id="promptThree"
                    name="promptThree"
                    type="text"
                    variant="filled"
                    onChange={handleChange}
                    value={data.prompThree}
                    // validate={() => {
                    //   if (
                    //     user.username.length > 20 ||
                    //     user.username.length < 5
                    //   ) {
                    //     return "Please enter a username between 5 and 20 characters";
                    //   }
                    // }}
                  />
                  <FormErrorMessage>{errors.promptOne}</FormErrorMessage>
                </FormControl>
                <FormControl isRequired="true">
                  <FormLabel htmlFor="improvement" fontSize={fontSize}>
                    What could I do better?
                  </FormLabel>
                  <Field
                    as={Textarea}
                    id="improvement"
                    name="improvement"
                    type="text"
                    variant="filled"
                    onChange={handleChange}
                    value={data.improvement}
                    // validate={() => {
                    //   if (
                    //     user.username.length > 20 ||
                    //     user.username.length < 5
                    //   ) {
                    //     return "Please enter a username between 5 and 20 characters";
                    //   }
                    // }}
                  />
                  <FormErrorMessage>{errors.promptOne}</FormErrorMessage>
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="Title" fontSize={fontSize}>
                    Frist Picture
                  </FormLabel>
                  <Field
                    as={Input}
                    id="title"
                    name="title"
                    type="file"
                    variant="filled"
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                      previewFile(e.target.files[0]);
                    }}
                    // value={file}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="Title" fontSize={fontSize}>
                    Second Picture
                  </FormLabel>
                  <Field
                    as={Input}
                    id="title"
                    name="title"
                    type="file"
                    variant="filled"
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                      previewFile(e.target.files[0]);
                    }}
                    // value={file}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="Title" fontSize={fontSize}>
                    Third Picture
                  </FormLabel>
                  <Field
                    as={Input}
                    id="title"
                    name="title"
                    type="file"
                    variant="filled"
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                      previewFile(e.target.files[0]);
                    }}
                    // value={file}
                  />
                </FormControl>
                <FormControl
                  isInvalid={!!errors.password && touched.password}
                  isRequired="true"
                >
                  <FormLabel htmlFor="password" fontSize={fontSize}>
                    Password
                  </FormLabel>
                  <Field
                    as={Input}
                    id="password"
                    name="password"
                    type="password"
                    variant="filled"
                    validate={() => {
                      // return passwordValidation(user.password);
                    }}
                    onChange={handleChange}
                    // value={user.password}
                  />
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={!!errors.matchPassword && touched.matchPassword}
                  isRequired="true"
                >
                  <FormLabel htmlFor="matchPassword" fontSize={fontSize}>
                    Confirm Password
                  </FormLabel>
                  <Field
                    as={Input}
                    id="matchPassword"
                    name="matchPassword"
                    type="password"
                    variant="filled"
                    // validate={() => {
                    //   if (user.matchPassword !== user.password) {
                    //     return "Passwords do not match, please try again";
                    //   }
                    // }}
                    onChange={handleChange}
                    // value={user.matchPassword}
                  />
                  <FormErrorMessage>{errors.matchPassword}</FormErrorMessage>
                </FormControl>
                <Button
                  type="submit"
                  bg="purple.400"
                  w="full"
                  color="white"
                  variant="solid"
                >
                  Create Journal
                </Button>
              </VStack>
            </Form>
          )}
        </Formik>
      </Box>
      <div>
        <form
          className="p-4 p-md-5 border rounded-3 bg-light"
          onSubmit={handleSubmit}
        >
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              name="title"
              autoComplete="off"
              onChange={handleChange}
              required
              placeholder="Title of your journal"
            />
            <label htmlFor="title">Title</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              name="promptOne"
              autoComplete="off"
              onChange={handleChange}
              required
              placeholder="Enter Positive Prompt 1"
            />
            <label htmlFor="username">Positive #1</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              name="promptTwo"
              autoComplete="off"
              onChange={handleChange}
              required
              placeholder="Enter Positive Prompt 2"
            />
            <label htmlFor="username">Positive #2</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              name="promptThree"
              autoComplete="off"
              onChange={handleChange}
              required
              placeholder="Enter Positive Prompt 3"
            />
            <label htmlFor="username">Positive #3</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              name="improvement"
              autoComplete="off"
              required
              onChange={handleChange}
              placeholder="Enter Improvement Prompt"
            />
            <label htmlFor="username">Daily Improvement</label>
          </div>
          <div className="mb-3">
            <label htmlFor="imgUpload" className="form-label">
              Image One
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
          <div className="mb-3">
            <label htmlFor="imgUpload" className="form-label">
              Image Two
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
          <div className="mb-3">
            <label htmlFor="imgUpload" className="form-label">
              Image Three
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
          <label for="customRange3" class="form-label">
            Example range
          </label>
          <input
            type="range"
            class="form-range"
            min="0"
            max="6"
            step="1"
            id="customRange3"
            name="dayRating"
            onChange={handleChange}
          ></input>
          <div className="mb-3">
            <label className="form-label">
              Do you want to make your journal public?
            </label>
            <select
              className="form-select"
              aria-label="select example"
              name="isPublic"
              required
              onChange={handleChange}
            >
              <option value="0" defaultValue={"0"}>
                No
              </option>
              <option value="1">Yes</option>
            </select>
          </div>
          <label for="startDate">Date of Journal: </label>
          <input
            id="startDate"
            class="form-control"
            type="date"
            name="date"
            onChange={handleChange}
          />
          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Create Entry
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateJournal;

//Add the mood choice ennumrator
//Add date selection
//For the date selector set the max date to the current date, we don't want users selecting dates in the futture

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
  //States for image files (used temporarily to extract file information ie name etc)
  const [file, setFile] = useState("");
  //State for the image URLs to be sent to the backend
  const [image, setImage] = useState([0, 0, 0]);
  //State for saving the file name from the image uploads
  const [name, setName] = useState(['', '', '']);
  

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

    //On reader onloadend, add the name to the name state and the image to the image state. The backend will cleanup any unused image array space
    reader.onloadend = () => {
      //Setting each image in the array
      const newImages = image.slice()
      newImages[index] = reader.result
      setImage(newImages)
      //Setting the name of the images that were uploaded
      const newName = name.slice()
      newName[index] = file.name
      setName(newName)
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
                  />
                  <FormErrorMessage>{errors.promptOne}</FormErrorMessage>
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="Title" fontSize={fontSize}>
                    Frist Picture
                  </FormLabel>
                  {name[0] ? (
                    <p>{name[0]}</p>
                  ) : (
                    <Field
                      as={Input}
                      id="title"
                      name="title"
                      type="file"
                      variant="filled"
                      onChange={(e) => {
                        setFile(e.target.files[0]);
                        previewFile(e.target.files[0], 0);
                      }}
                    />
                  )}
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor="Title" fontSize={fontSize}>
                    Second Picture
                  </FormLabel>
                  {name[1] ? (
                    <p>{name[1]}</p>
                  ) : (
                    <Field
                      as={Input}
                      id="title"
                      name="title"
                      type="file"
                      variant="filled"
                      onChange={(e) => {
                        setFile(e.target.files[0]);
                        previewFile(e.target.files[0], 1);
                      }}
                    />
                  )}
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="Title" fontSize={fontSize}>
                    Third Picture
                  </FormLabel>
                  {name[2] ? (
                    <p>{name[2]}</p>
                  ) : (
                    <Field
                      as={Input}
                      id="title"
                      name="title"
                      type="file"
                      variant="filled"
                      onChange={(e) => {
                        setFile(e.target.files[0]);
                        previewFile(e.target.files[0], 2);
                      }}
                    />
                  )}
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

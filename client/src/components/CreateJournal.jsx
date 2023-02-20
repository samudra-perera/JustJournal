import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  RadioGroup,
  Radio,
  Stack,
  Textarea,
  VStack,
  Slider,
  SliderMark,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";

import { SingleDatepicker } from "chakra-dayzed-datepicker";

const CreateJournal = () => {
  //States for the form inputs
  const [data, setData] = useState({
    title: "",
    promptOne: "",
    promptTwo: "",
    promptThree: "",
    improvement: "",
    isPublic: "0",
  });
  //States for image files (used temporarily to extract file information ie name etc)
  const [file, setFile] = useState("");
  //State for the image URLs to be sent to the backend
  const [image, setImage] = useState([0, 0, 0]);
  //State for saving the file name from the image uploads
  const [name, setName] = useState(["", "", ""]);
  //State for DayRating
  const [dayRating, setDayRating] = useState(3);
  //Setting the state for the date
  const [date, setDate] = useState(new Date());

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
          dayRating: dayRating,
          date: date,
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
    createJournal();
  };

  //Helper function to set the image as a URL to send as a req.body instead of req.file
  const previewFile = (file, index) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    //On reader onloadend, add the name to the name state and the image to the image state. The backend will cleanup any unused image array space
    reader.onloadend = () => {
      //Setting each image in the array
      const newImages = image.slice();
      newImages[index] = reader.result;
      setImage(newImages);
      //Setting the name of the images that were uploaded
      const newName = name.slice();
      newName[index] = file.name;
      setName(newName);
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

  const labelStyles = {
    mt: "2",
    ml: "-2.5",
    fontSize: "sm",
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
                <FormControl isRequired="true" isInvalid={!!errors.title && touched.title}>
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
                    validate={() => charLimit(data.title, 70)}
                  />
                  <FormErrorMessage>{errors.title}</FormErrorMessage>
                </FormControl>
                <FormControl
                  isRequired="true"
                  isInvalid={!!errors.promptOne && touched.promptOne}
                >
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
                    validate={() => charLimit(data.promptOne, 500)}
                  />
                  <FormErrorMessage>{errors.promptOne}</FormErrorMessage>
                </FormControl>
                <FormControl
                  isRequired="true"
                  isInvalid={!!errors.promptTwo && touched.promptTwo}
                >
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
                    validate={() => charLimit(data.promptTwo, 500)}
                  />
                  <FormErrorMessage>{errors.promptTwo}</FormErrorMessage>
                </FormControl>
                <FormControl
                  isRequired="true"
                  isInvalid={!!errors.promptThree && touched.promptThree}
                >
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
                    value={data.promptThree}
                    validate={() => charLimit(data.promptThree, 500)}
                  />
                  <FormErrorMessage>{errors.promptThree}</FormErrorMessage>
                </FormControl>
                <FormControl
                  isRequired="true"
                  isInvalid={!!errors.improvement && touched.improvement}
                >
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
                    validate={() => charLimit(data.improvement, 500)}
                  />
                  <FormErrorMessage>{errors.improvement}</FormErrorMessage>
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
                <FormControl isRequired="true">
                  <FormLabel htmlFor="isPublic" fontSize={fontSize}>
                    Do you this Journal to be public?
                  </FormLabel>
                  <RadioGroup defaultValue={data.isPublic}>
                    <Stack spacing={5} direction="row" onChange={handleChange}>
                      <Radio colorScheme="red" value="1" name="isPublic">
                        Public
                      </Radio>
                      <Radio colorScheme="green" value="0" name="isPublic">
                        Private
                      </Radio>
                    </Stack>
                  </RadioGroup>
                </FormControl>
                <FormControl isRequired="true">
                  <FormLabel htmlFor="dayRating" fontSize={fontSize}>
                    Rate your day for Bad to Great
                  </FormLabel>
                  <Slider
                    name="dayRating"
                    id="dayRating"
                    onChange={(v) => setDayRating(v)}
                    min={0}
                    max={6}
                    defaultValue={dayRating}
                  >
                    <SliderMark value={0} {...labelStyles}>
                      0
                    </SliderMark>
                    <SliderMark value={1} {...labelStyles}>
                      1
                    </SliderMark>
                    <SliderMark value={2} {...labelStyles}>
                      2
                    </SliderMark>
                    <SliderMark value={3} {...labelStyles}>
                      3
                    </SliderMark>
                    <SliderMark value={4} {...labelStyles}>
                      4
                    </SliderMark>
                    <SliderMark value={5} {...labelStyles}>
                      5
                    </SliderMark>
                    <SliderMark value={6} {...labelStyles}>
                      6
                    </SliderMark>
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                </FormControl>
                <FormControl isRequired="true">
                  <FormLabel>Journal Date: </FormLabel>
                  <SingleDatepicker
                    name="date"
                    onDateChange={setDate}
                    date={date}
                    maxDate={new Date()}
                  />
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
    </>
  );
};

export default CreateJournal;

//Add the mood choice ennumrator
//Add date selection
//For the date selector set the max date to the current date, we don't want users selecting dates in the futture

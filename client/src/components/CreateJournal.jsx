import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, renderMatches, useNavigate, useParams } from "react-router-dom";

const CreateJournal = () => {
  //States for the form inputs
  const [data, setData] = useState({
    title: "",
    promptOne: "",
    promptTwo: "",
    prompThree: "",
    improvement: "",
    isPublic: "0",
    dayRating: "",
    date: "",
  });
  console.log(data)
  //States for image files
  const [file, setFile] = useState("");
  const [image, setImage] = useState([]);

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

  return (
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
        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Create Entry
        </button>
      </form>
    </div>
  );
};

export default CreateJournal;

//Add the mood choice ennumrator

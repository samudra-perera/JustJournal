import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UpdateJournal = () => {
  //Setting the state of the form inputs
  const [title, setTitle] = useState("");
  const [promptOne, setPromptOne] = useState("");
  const [promptTwo, setPromptTwo] = useState("");
  const [promptThree, setPromptThree] = useState("");
  const [improvement, setImprovement] = useState("");
  const [isPublic, setIsPublic] = useState("0");

  //Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    updateJournal();
  };
  //API Call to set the state of the form inputs
  const { id } = useParams();   //To get the id of the Journal being edited

  useEffect(() => {
    const getJournal = async () => {
      try {
        const res = await axios.get(
          process.env.REACT_APP_API_URL + `/api/journal/${id}`,
          {
            withCredentials: true,
          }
        );
        //setJournal(res.data.journal);
        setTitle(res.data.journal.title);
        setPromptOne(res.data.journal.posPromptOne);
        setPromptTwo(res.data.journal.posPromptTwo);
        setPromptThree(res.data.journal.posPromptThree);
        setImprovement(res.data.journal.improvPrompt);
        if (res.data.journal.isPublic === true) {
          setIsPublic("1");
        } else {
          setIsPublic("0");
        }

        console.log(res.data.journal.title);
      } catch (err) {
        console.log(err);
      }
    };
    getJournal();
  }, []);

  //API call to update the journal entry
  const updateJournal = async () => {
    try {
      const res = await axios.put(
        process.env.REACT_APP_API_URL + `/api/journal//updateJournal/${id}`,
        {
            title: title,
            posPromptOne: promptOne,
            posPromptTwo: promptTwo,
            posPromptThree: promptThree,
            improvPrompt: improvement,
            isPublic: isPublic
        },
        {
          withCredentials: true,
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

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
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
            placeholder="Title of your journal"
          />
          <label htmlFor="title">Title</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            name="posPromptOne"
            autoComplete="off"
            onChange={(e) => setPromptOne(e.target.value)}
            value={promptOne}
            required
            placeholder="Enter Positive Prompt 1"
          />
          <label htmlFor="username">Positive #1</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            name="posPromptTwo"
            autoComplete="off"
            onChange={(e) => setPromptTwo(e.target.value)}
            value={promptTwo}
            required
            placeholder="Enter Positive Prompt 2"
          />
          <label htmlFor="username">Positive #2</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            name="posPromptThree"
            autoComplete="off"
            onChange={(e) => setPromptThree(e.target.value)}
            value={promptThree}
            required
            placeholder="Enter Positive Prompt 3"
          />
          <label htmlFor="username">Positive #3</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            name="improvPrompt"
            autoComplete="off"
            required
            onChange={(e) => setImprovement(e.target.value)}
            value={improvement}
            placeholder="Enter Improvement Prompt"
          />
          <label htmlFor="username">Daily Improvement</label>
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
            defaultValue={isPublic}
            onChange={(e) => setIsPublic(e.target.value)}
          >
            <option value="0">
              No
            </option>
            <option value="1">Yes</option>
          </select>
        </div>
        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Update Entry
        </button>
      </form>
    </div>
  );
};

export default UpdateJournal;

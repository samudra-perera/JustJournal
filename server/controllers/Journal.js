const Journal = require("../models/Journal");
const Comment = require("../models/Comment");
// const path = require('path')
const User = require("../models/User");
const cloudinary = require("../middleware/cloudinary");
const Profile = require("../models/Profile");

module.exports = {
  //Create a Journal Entry
  //POST
  //url/api/journal/createJournal
  createJournal: async (req, res) => {
    console.log(req.sessionID);
    try {
      const {
        title,
        posPromptOne,
        posPromptTwo,
        posPromptThree,
        improvPrompt,
        isPublic,
        image,
        dayRating,
        date,
      } = req.body;

      //Check if there is a Journal that exists for the current date, if there is a Journal that exists already tell the user to pick a diff date
      const findDate = await Journal.find({ stringDate: date });
      console.log(findDate);
      if (findDate.length != 0) {
        return res.json("There already exists a journal for this date");
      }

      //The image body is sent as an array and needs to be converted into the correct array format prior to saving in the MongoDB document store
      const result = [];
      const cloud = [];
      //Loop through the image array and upload each image onto cloudinary and save the URL and IDs in the result and cloud array
      for (let i = 0; i < image.length; i++) {
        if (image[i] == 0) {
          continue;
        }
        result[i] = await cloudinary.uploader.upload(image[i]);
        cloud[i] = result[i].public_id;
        result[i] = result[i].secure_url;
      }

      //Create the journal in the MongoDB store
      const journal = await Journal.create({
        title: title,
        posPromptOne: posPromptOne,
        posPromptTwo: posPromptTwo,
        posPromptThree: posPromptThree,
        improvPrompt: improvPrompt,
        isPublic: isPublic == "1" ? true : false, //if the string is true set isPublic to true
        cloudinaryID: cloud,
        imageURL: result,
        user: req.user,
        likes: 0,
        moodState: dayRating,
        journalDate: date,
        stringDate: date,
      });
      console.log("Journal Entry has been created");
      res.json({ journal });
    } catch (err) {
      console.log(err);
    }
  },
  //Get A single Journal Entry
  //GET
  //api/journal/:id
  getJournal: async (req, res) => {
    try {
      const journal = await Journal.findById(req.params.id);
      const user = await User.findById(journal.user);
      res.json({ journal: journal, user: user });
    } catch (err) {
      console.log(err);
    }
  },
  //Get all Jounral Entries by the user
  //GET
  // url/dashboard/:id
  getUserFeed: async (req, res) => {
    try {
      //const user = await User.findById({id: req.user})    //change to req.user
      const journals = await Journal.find({ user: req.params.id }).sort({
        createAt: "desc",
      });
      //Find the profile information as well
      const profile = await Profile.find({ user: req.params.id });
      res.json({ journal: journals, profile: profile });
    } catch (err) {
      console.log(err);
    }
  },
  //Delete a specific Journal Entry
  //DELETE
  // api/journal/deleteJournal/:id
  deleteJournal: async (req, res) => {
    try {
      //Find Journal
      let journal = await Journal.findById({ _id: req.params.id });
      //Delete image from cloudinary by looping through the cloudinary array and deleting each image
      for (let i = 0; i < journal.cloudinaryID.length; i++) {
        await cloudinary.uploader.destroy(journal.cloudinaryID[i]);
      }

      //Need to delete any comments that have this JournalID associated with them
      await Comment.deleteMany({ journalID: req.params.id });
      //Delete Post from DB
      await Journal.deleteOne({ _id: req.params.id });
      res.json("Deleted Journal");
    } catch (err) {
      console.log(err);
    }
  },
  //Update a Journal
  //PUT
  //api/journal/updateJournal/:id'
  updateJournal: async (req, res) => {
    //Add method to update the image
    try {
      const {
        title,
        posPromptOne,
        posPromptTwo,
        posPromptThree,
        improvPrompt,
        isPublic,
      } = req.body;

      const editJournal = await Journal.findByIdAndUpdate(
        { _id: req.params.id },
        {
          title: title,
          posPromptOne: posPromptOne,
          posPromptTwo: posPromptTwo,
          posPromptThree: posPromptThree,
          improvPrompt: improvPrompt,
          isPublic: isPublic == "1" ? true : false,
        },
        {
          new: true,
          runValidators: true,
        }
      );
      res.json(editJournal);
    } catch (err) {
      console.log(err);
    }
  },
  addLike: async (req, res) => {
    try {
    } catch (err) {
      console.log(err);
    }
  },
  removeLike: async (req, res) => {
    try {
    } catch (err) {}
  },
  //Search journals and followers and returns both
  //GET
  // api/journal/search/:id
  searchJournals: async (req, res) => {
    try {
      const query = req.query.search;
      const id = req.params.id;

      //The Journal Query
      const journal = await Journal.aggregate([
        {
          $search: {
            index: "search-text",
            text: {
              query: query,
              path: {
                wildcard: "*",
              },
            },
          },
        },
      ]);
      //Filter search results for the journal based on the userID
      //Obviously not very effecient, but the best we can do for right now 
      //Most effective way is to query using the userID then search smaller collection subset
      const result = journal.map(journal => {
        if(journal.user == id) {
          return journal
        }
      })

      //The User Query

      console.log(id)
      console.log(result)
      // console.log(journal);

      return 1;
    } catch (err) {
      console.log(err);
    }
  },
};

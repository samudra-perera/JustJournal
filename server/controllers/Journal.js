const Journal = require("../models/Journal");
const Comment = require("../models/Comment");
// const path = require('path')
const User = require("../models/User");
const cloudinary = require("../middleware/cloudinary");

module.exports = {
  //Create a Journal Entry
  //POST
  //url/api/journal/createJournal
  createJournal: async (req, res) => {
    try {
      const {
        title,
        posPromptOne,
        posPromptTwo,
        posPromptThree,
        improvPrompt,
        isPublic,
        image,
      } = req.body;
      const result = await cloudinary.uploader.upload(image);
      const journal = await Journal.create({
        title: title,
        posPromptOne: posPromptOne,
        posPromptTwo: posPromptTwo,
        posPromptThree: posPromptThree,
        improvPrompt: improvPrompt,
        isPublic: isPublic == "1" ? true : false, //if the string is true set isPublic to true
        cloudinaryID: result.public_id,
        imageURL: result.secure_url,
        user: req.user,
        likes: 0,
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
      res.json(journals);
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
      //Delete image from cloudinary
      await cloudinary.uploader.destroy(journal.cloudinaryID);
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
};

const Comment = require("../models/Comment");
const User = require("../models/User");
const Journal = require("../models/Journal");

module.exports = {
  ///api/journal/addComment/:journal
  //Adding comment to Journals/
  //POST
  createComment: async (req, res) => {
    try {
      console.log(req.sessionID)
      const { comment } = req.body;
      const temp = await User.findById(req.user._id); //Temp variable to get the user object for the specific user
      const userComment = await Comment.create({
        user: req.user.id,
        comment: comment,
        journalID: req.params.id,
        userName: temp.userName,
      });
      res.json(userComment);
      // console.log(req.params.id)
    } catch (err) {
      console.log(err);
    }
  },
  //GET
  //Gets all the comments based on the journalID
  //api/jorunal/getComments/:id
  getComment: async (req, res) => {
    console.log(req.sessionID)
    try {
      const comments = await Comment.find({ journalID: req.params.id }); //.sort({createAt: 'desc'}) for test don't need
      res.json(comments);
    } catch (err) {
      console.log(err);
    }
  },
  //If the user created a comment they should be able to delete them, the owner of the journals should be able to delete them too
  //Check if the user attempting to delete the comment is the user who commented or is the user who is the owner of the Journal
  //If it is either Delete the comment
  //DELETE
  //api/journal/deleteComment/:id
  deleteComment: async (req, res) => {
    try {
      let comment = await Comment.find({ _id: req.params.id });
      let journalUser = await Journal.find({ _id: comment[0].journalID });
      //If the person deleting the comment is the owner of the comment or is the owner of the journal then delete the comment
      if (req.user._id.equals(comment[0].user) || req.user._id.equals(journalUser[0].user)) {
        await Comment.deleteOne({ _id: req.params.id });
        res.json('Comment got deleted');
      } else {
        res.json("You do not have authorization to delete this comment");
      }
    } catch (err) {
      console.log(err);
    }
  },
};

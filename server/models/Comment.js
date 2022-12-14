const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  userName: {
    type: String,
  },
  comment: {
    type: String,
    require: true
  }, 
  journalID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Journal"
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


module.exports = mongoose.model("Comment", CommentSchema);
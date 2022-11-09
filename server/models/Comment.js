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
  postID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Journal"
  }
});


module.exports = mongoose.model("Comment", CommmentSchema);
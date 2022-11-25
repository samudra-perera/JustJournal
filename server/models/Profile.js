const mongoose = require("mongoose");

//Need to add logic for followers and following

const ProfileSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  bio: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  cloudinaryID: {
    type: String,
    required: false,
  },
  imageURL: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Profile", ProfileSchema);

const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  bio: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  cloudinaryID: {
    type: String,
    required: false,
  },
});

const mongoose = require("mongoose");

const JournalSchema = new mongoose.Schema({
  posPromptOne: {
    type: String,
    required: true,
  },
  posPromptTwo: {
    type: String,
    required: true,
  },
  posPromptThree: {
    type: String,
    required: true,
  },
  improvPrompt: {
    type: String,
    required: true,
  },
  cloudinaryID: {
    type: String,
    required: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Number,
  },
});

module.exports = mongoose.model("Journal", JournalSchema);

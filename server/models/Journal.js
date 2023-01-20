const mongoose = require("mongoose");

//Add the mood choice option within this model

const JournalSchema = new mongoose.Schema({
  title: {
    type: String, 
    required: false,
  },
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
  cloudinaryID: [{
    type: String,
    required: false,
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isPublic: {
    type: Boolean,
    default: false,
    required: true
  },
  likes: {
    type: Number,
  },
  imageURL : [{
    type: String,
    required: false
  }]
});

module.exports = mongoose.model("Journal", JournalSchema);

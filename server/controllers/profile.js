const Profile = require("../models/Profile");
const cloudinary = require("../middleware/cloudinary");
const Journal = require("../models/Journal");

module.exports = {
  //Get profile information for the user who is logged in
  ///getProfile/:userName
  //GET
  getProfile: async (req, res) => {
    try {
      //const user = await User.findOne({ _id: req.user._id });
      const profile = await Profile.find({ user: req.user._id });
      const journals = await Journal.countDocuments({ user: req.user._id });
      res.json({profiles: profile, numOfJournals: journals});
    } catch (err) {
      console.log(err);
    }
  },
  getNoneUserProfile: async(req, res) => {
    try {
        
    } catch (err) {
        console.log(err)
    }
  },
  //Create Profile
  //
  //POST
  createProfile: async (req, res) => {
    try {
      const { firstName, lastName, bio, image } = req.body;
      const result = await cloudinary.uploader.upload(image);
      const profile = await Profile.create({
        user: req.user,
        firstName: firstName,
        lastName: lastName,
        bio: bio,
        cloudinaryID: result.public_id,
        imageURL: result.secure_url,
      });
      res.json(profile);
    } catch (err) {
      console.log(err);
    }
  },
  editProfile: async (req, res) => {
    try {
    } catch (err) {
      console.log(err);
    }
  },
  followProfile: async (req, res) => {
    try {
    } catch (err) {
      console.log(err);
    }
  },
  unfollowProfile: async (req, res) => {
    try {
    } catch (err) {
      console.log(err);
    }
  },
  getFollowers: async(req, res) => {
    try {
        
    } catch (err) {
        console.log(err)
    }
  },
  getFollowing: async(req, res) => {
    try {
        
    } catch (err) {
        
    }
  }

  //Update Profile
  //Delete Account //Need the User model for this
};

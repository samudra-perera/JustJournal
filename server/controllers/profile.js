const Profile = require("../models/Profile");
const cloudinary = require("../middleware/cloudinary");
const User = require("../models/User");

module.exports = {
  //Get profile information
  ///getProfile/:userName
  //GET
  getProfile: async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.user._id });
      const profile = await Profile.find({ user: user.id });
      res.json(profile);
    } catch (err) {
      console.log(err);
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

  //Update Profile
  //Delete Account //Need the User model for this
};

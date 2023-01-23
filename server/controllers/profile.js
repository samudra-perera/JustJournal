const Profile = require("../models/Profile");
const cloudinary = require("../middleware/cloudinary");
const Journal = require("../models/Journal");
const User = require('../models/User')

module.exports = {
  //Get profile information for the user who is logged in
  ///getProfile/:userName
  //GET
  getProfile: async (req, res) => {
    try {
      //const user = await User.findOne({ _id: req.user._id });
      const profile = await Profile.find({ user: req.params.id });
      const journals = await Journal.countDocuments({ user: req.params.id });    //Get the number of journals
      res.json({profiles: profile, numOfJournals: journals});
    } catch (err) {
      console.log(err);
    }
  },
  getClickedProfile: async(req, res) => {
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
  //GET
  //api/profile/getFollowers/:id
  //To get the followers for the profile in question
  getFollowers: async(req, res) => {
    try {
        const followers = await Profile.findById(req.params.id , {followers: 1}) //returns only the followers
        res.json(followers)

    } catch (err) {
        console.log(err)
    }
  },
  //GET
  //api/profile/getFollowing/:id
  //To get the following for the profile in question
  getFollowing: async(req, res) => {
    try {
        const following = await Profile.findById(req.params.id, {following: 1})
        res.json(following)
    } catch (err) {
        console.log(err)
    }
  },

  getUserInfo: async(req, res) => {
    try {
      const userName = await User.findById(req.params.id, {userName: 1})
      const profilePic = await Profile.findOne({user: req.params.id}, {imageURL: 1})
      res.json({userName: userName , profilePic: profilePic})
    } catch (err) {
      console.log(err)
    }
  },
  //PUT
  //api/profile/follow/:id
  //To follow another user
  follow: async(req,res) => {
    try {
      console.log(req.body._id)
      let userProfileId = await Profile.findOne({user:req.user.id})
      userProfileId = userProfileId._id
      // Gets the profile of the user that is logged in and add the user Profile to the following
      const followee = await Profile.findOneAndUpdate({user: req.user.id}, {
        $push:{following:req.body._id}
      },{
        new: true
      })
      //Get the profile of the person to follow and add the loggedIn user profileID to the user
      const follow = await Profile.findByIdAndUpdate(req.body._id, {
        $push:{followers: userProfileId._id}
      })
      console.log(userProfileId)
      
    } catch (err) {
      console.log(err)
    }    
  },
  //PUT
  //api/profile/unfollow/:id
  //To unfollow another user
  unfollow: async(req, res) => {
    try {
      console.log(req.body._id)
      let userProfileId = await Profile.findOne({user:req.user.id})
      userProfileId = userProfileId._id
      // Gets the profile of the user that is logged in and remove the user Profile to the following
      const followee = await Profile.findOneAndUpdate({user: req.user.id}, {
        $pull:{following:req.body._id}
      },{
        new: true
      })
      //Get the profile of the person to follow and remove the loggedIn user profileID to the user
      const follow = await Profile.findByIdAndUpdate(req.body._id, {
        $pull:{followers: userProfileId._id}
      })
      console.log(userProfileId)
      
    } catch (err) {
      console.log(err)
    }    
  }

};

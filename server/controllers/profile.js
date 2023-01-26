const Profile = require("../models/Profile");
const cloudinary = require("../middleware/cloudinary");
const Journal = require("../models/Journal");
const User = require('../models/User')

module.exports = {
  //Get profile information for any user by passing in params
  ///getProfile/:userName
  //GET
  getProfile: async (req, res) => {
    try {
      //If the params is the profile ID the profile wont return null and will not execute the IF block
      let profile = await Profile.findById(req.params.id );
      //If the userID is sent search the profile documents using the userID
      if (profile == null) {
        profile = await Profile.findOne({user: req.params.id})
      }
      const journals = await Journal.countDocuments({ user: profile.user });    //Get the number of journals
      res.json({profiles: profile, numOfJournals: journals});
    } catch (err) {
      console.log(err);
    }
  },
  //GET profile information for the loggedIn user specifically
  //getprofile/loggedIn
  //GET
  getUserProfile: async (req, res) => {
    try {
      const profile = await Profile.findOne({user: req.user._id});
      const profileID = profile._id
      res.json(profileID)
    } catch (err) {
      console.log(err)
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
      const profile = await Profile.findById(req.params.id)
      const user = await User.findById(profile.user)
      res.json({profilePic: profile.imageURL, userName: user.userName})
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
      // Gets the profile of the user that is logged in and  the user Profile to the following
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

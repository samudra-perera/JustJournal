const Profile = require('../models/Profile')
const cloudinary = require('../middleware/cloudinary')
const User = require('../models/User')

module.exports ={
    //Get profile information
    ///getProfile/:userName
    //GET
    getProfile: async(req, res) => {
        try {
            const user = await User.findOne({userName: req.params.userName})
            const profile = await Profile.find({user: user.id})
            res.json(profile)
        } catch (err) {
            console.log(err)
        }
    },
    //Create Profile 
    //
    //POST
    createProfile: async(req, res) => {
        try {
            const {firstName, lastName, bio, user} = req.body
            const profile = await Profile.create({
                user: user,
                firstName: firstName, 
                lastName: lastName,
                bio: bio,
                cloudinaryID: 'Just Temporary' //Replace when the upload functionality 

            })
            res.json(profile)
        } catch (err) {
            console.log(err)
        }
    },
    editProfile: async(req, res) => {
        try {
            
        } catch (err) {
            console.log(err)
        }
    }

    //Update Profile
    //Delete Account //Need the User model for this
}
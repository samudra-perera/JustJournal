const Journal = require('../models/Journal')
const User = require('../models/User')
const cloudinary = require('../middleware/cloudinary')

module.exports = {
    //Create a Journal Entry
    //POST 
    //url/api/journal/createJournal
    createJournal: async (req, res) => {
        try {
            //const result = await cloudinary.uploader.upload(req.file.path)
            const { title, posPromptOne, posPromptTwo, posPromptThree, improvPrompt, user, isPublic } = req.body
            const journal = await Journal.create({
                title: title,
                posPromptOne: posPromptOne,
                posPromptTwo: posPromptTwo,
                posPromptThree: posPromptThree,
                improvPrompt: improvPrompt,
                isPublic: isPublic == 'true' ? true : false,    //if the string is true set isPublic to true 
                cloudinaryID: 'This is the example ID', //result.public_id,
                user: user, //req.user.id
                likes: 0
            })
            console.log('Journal Entry has been created')
            res.json({journal})
        } catch (err) {
            console.log(err)
        }
    },
    //Get A single Journal Entry
    //GET
    //api/journal/:id
    getJournal: async(req, res) => {
        try {
            const journal = await Journal.findById(req.params.id);
            res.json(journal)
        } catch (err) {
            console.log(err)
        }
    },
    //Get all Jounral Entries by the user
    //GET
    // url/dashboard
    getUserFeed: async(req, res) => {
        try {
            const user = await User.findOne({userName: req.params.userName})
            const journals = await Journal.find({user: user.id}).sort({createAt: 'desc'})
            res.json(journals)
        } catch (err) {
            console.log(err)
        }
    },
    //Delete a specific Journal Entry 
    //DELETE 
    // api/journal/deleteJournal/:id
    deleteJournal: async(req, res) => {
        try {
            await Journal.findByIdAndDelete({_id: req.params.id})
            res.json('Deleted Journal')
        } catch (err) {
            console.log(err)
        }
    }
}
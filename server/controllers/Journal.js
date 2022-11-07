const Journal = require('../models/Journal')
const cloudinary = require('../middleware/cloudinary')

module.exports = {
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
                isPublic: isPublic == 'true' ? true : false,
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
    getJournal: async(req, res) => {
        try {
            
        } catch (err) {
            console.log(err)
        }
    }
}

const Journal = require('../models/Journal')
const cloudinary = require('../middleware/cloudinary')

module.exports = {
    createJournal: async (req, res) => {
        try {
            const result = await cloudinary.uploader.upload(req.file.path)
            const { posPromptOne, posPromptTwo, posPromptThree, improvPrompt } = req.body
            
            const journal = await Journal.create({
                posPromptOne: posPromptOne,
                posPromptTwo: posPromptTwo,
                posPromptThree: posPromptThree,
                improvPrompt: improvPrompt,
                cloudinaryID: result.public_id,
                user: req.user.id,
                likes: 0
            })
            console.log('Journal Entry has been created')
            res.json({journal})
        } catch (error) {
            console.log(err)
        }
        
    
    }
}

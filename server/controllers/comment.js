const Comment = require('../models/Comment')
const User = require('../models/User')
const Journal = require('../models/Journal')

module.exports = {
    ///api/journal/addComment/:journal
    //Adding comment to Journals/
    //POST
    createComment: async(req,res) => {
        try {
            const {comment, user} = req.body
            const temp = await User.findById({_id: user}) //Temp variable to get the user object for the specific user
            const userComment = await Comment.create({
                user: req.user.id,
                comment: comment,
                journalID: req.params.id,
                userName: temp.userName
            })
            res.json(userComment)
        } catch (err) {
            console.log(err)
        }
    },
    getComment: async(req, res) => {
        try {
            const comments = await Comment.find({journalID: req.params.id})//.sort({createAt: 'desc'}) for test don't need
            res.json(comments)
        } catch (err) {
            console.log(err)
        }
    }
    //If the user created a comment they should be able to delete them, the owner of the journals should be able to delete them too
    //Check if the user attempting to delete the comment is the user who commented or is the user who is the owner of the Journal
    //If it is either Delete the comment
}
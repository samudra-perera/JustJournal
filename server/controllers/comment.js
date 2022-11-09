const Comment = require('../models/Comment')
const User = require('../models/User')
const Journal = require('../models/Journal')

module.exports = {
    ///api/journal/addComment
    //Adding comment to Journals
    //POST
    createComment: async(req,res) => {
        try {
            const {comment, user} = req.body
            const temp = await User.findById({_id: user}) //Temp variable to get the user object for the specific user
            const userComment = await Comment.create({
                user: user, //req.user.id
                comment: comment,
                journalID: req.params.journal,
                userName: temp.userName
            })
            res.json(userComment)
        } catch (err) {
            console.log(err)
        }
    },
    //If the user created a comment they should be able to delete them
    //Check if the user attempting to delete the comment is the user who commented or is the user who is the owner of the Journal
    //If it is either Delete the comment
}
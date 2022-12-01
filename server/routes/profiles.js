const express = require('express')
const router = express.Router()
const {ensureAuth} = require('../middleware/auth')
const profileController = require('../controllers/profile')

router.get('/getFollowers/:id', ensureAuth,profileController.getFollowers)
router.get('/getFollowing/:id', ensureAuth, profileController.getFollowing)

module.exports = router
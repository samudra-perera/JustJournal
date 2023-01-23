const express = require('express')
const router = express.Router()
const {ensureAuth} = require('../middleware/auth')
const profileController = require('../controllers/profile')

router.get('/getFollowers/:id', ensureAuth,profileController.getFollowers)
router.get('/getFollowing/:id', ensureAuth, profileController.getFollowing)
router.get('/userInfo/:id', ensureAuth, profileController.getUserInfo)
router.put('/follow/:id', profileController.follow)

module.exports = router
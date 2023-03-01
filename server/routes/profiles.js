const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../middleware/auth");
const profileController = require("../controllers/profile");

router.get("/getFollowers/:id", ensureAuth, profileController.getFollowers);
router.get("/getFollowing/:id", ensureAuth, profileController.getFollowing);
router.get("/userInfo/:id", ensureAuth, profileController.getUserInfo);
router.put("/follow", ensureAuth, profileController.follow);
router.put("/unfollow", ensureAuth, profileController.unfollow);
router.get('/getUser', ensureAuth, profileController.getUser)


module.exports = router;

const express = require("express");
const router = express.Router();
const authController = require('../controllers/auth');
const { ensureAuth } = require("../middleware/auth");
const journalController = require('../controllers/Journal');
const profile = require("../controllers/profile");

//Main Routes - simplified for now
// router.get('/api/dashboard', ensureAuth, '')
router.post("/login", authController.postLogin);        //Login works 
router.get("/logout", authController.logout);           //Apparently Works as well destroying the current session
router.get('/user', authController.getUser)
router.post("/signup", authController.postSignup);      //User creation ... works on postman
router.get('/dashboard/:userName', ensureAuth, journalController.getUserFeed)
router.get('/getProfile/:userName', ensureAuth, profile.getProfile)
router.post('/createProfile', profile.createProfile)

module.exports = router;
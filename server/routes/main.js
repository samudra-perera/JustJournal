const express = require("express");
const router = express.Router();
const authController = require('../controllers/auth');
const { ensureAuth } = require("../middleware/auth");
const journalController = require('../controllers/Journal');
const profile = require("../controllers/profile");

//Main Routes - simplified for now
// router.get('/api/dashboard', ensureAuth, '')
router.post("/login", authController.postLogin);        //Login works 
router.get("/logout", ensureAuth, authController.logout);           //Apparently Works as well destroying the current session
router.get('/user', ensureAuth, authController.getUser) //Will only retrieve the user object if the Authentication is approved to send the protected route
router.post("/signup", authController.postSignup);      //User creation ... works on postman
router.get('/dashboard/:id', ensureAuth, journalController.getUserFeed)
router.get('/getProfile/:id', ensureAuth, profile.getProfile)
router.post('/createProfile', profile.createProfile)

module.exports = router;
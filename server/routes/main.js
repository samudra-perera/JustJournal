const express = require("express");
const router = express.Router();
const authController = require('../controllers/auth');
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get('/api/dashboard', ensureAuth, '')
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.post("/signup", authController.postSignup);      //User creation ... works on postman

module.exports = router;
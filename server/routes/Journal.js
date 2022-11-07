const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer')
const journalController = require('../controllers/Journal')
const {ensureAuth, ensureGuest} = require('../middleware/auth')

router.post('/createJournal', journalController.createJournal)
router.get('/:id', journalController.getJournal)
module.exports = router
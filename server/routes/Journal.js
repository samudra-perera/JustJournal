const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer')
const journalController = require('../controllers/Journal')
const {ensureAuth, ensureGuest} = require('../middleware/auth')
const commentController = require('../controllers/comment')

router.post('/createJournal', journalController.createJournal)
router.get('/:id', journalController.getJournal)
router.delete('/deleteJournal/:id', journalController.deleteJournal)
router.post('/addComment', commentController.addComment)
module.exports = router
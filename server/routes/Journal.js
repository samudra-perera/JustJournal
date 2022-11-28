const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer')
const journalController = require('../controllers/Journal')
const {ensureAuth, ensureGuest} = require('../middleware/auth')
const commentController = require('../controllers/comment')

router.post('/createJournal', ensureAuth, journalController.createJournal)
router.put('/updateJournal/:id', ensureAuth, journalController.updateJournal)
router.get('/:id', ensureAuth, journalController.getJournal)
router.delete('/deleteJournal/:id', ensureAuth, journalController.deleteJournal)
router.post('/addComment/:id', ensureAuth, commentController.createComment)
router.get('/getComments/:id', ensureAuth, commentController.getComment)
router.delete('/deleteComment/:id', ensureAuth, commentController.deleteComment)
module.exports = router
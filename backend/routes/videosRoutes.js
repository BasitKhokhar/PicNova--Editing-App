const express = require('express');
const router = express.Router();
const {verifyToken, }= require('../middleware/authMiddleware');
const { generateVideo,getAllVideosByUser } = require('../controllers/videosController');

router.post('/enhancevideos',verifyToken, generateVideo);
router.get('/user/:storedUserId',verifyToken, getAllVideosByUser);

module.exports = router;
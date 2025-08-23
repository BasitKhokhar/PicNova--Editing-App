const express = require('express');
const router = express.Router();
const { generateVideo,getAllVideosByUser } = require('../controllers/videosController');

router.post('/enhancevideos', generateVideo);
router.get('/user/:storedUserId', getAllVideosByUser);

module.exports = router;
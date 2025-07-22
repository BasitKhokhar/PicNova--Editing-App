const express = require('express');
const router = express.Router();
const { uploadProfileImage, getUserImage } = require('../controllers/imageController');

router.post('/upload-profile-image', uploadProfileImage);
router.get('/user/:storedUserId', getUserImage);

module.exports = router;
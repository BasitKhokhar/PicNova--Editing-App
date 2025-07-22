const express = require('express');
const router = express.Router();
const { getUser, updateUser, getUserImage,PostProfileImage } = require('../controllers/userController');
router.get('/:userId', getUser);
router.put('/:id', updateUser);
router.get('/user_images/:userId', getUserImage);
router.post('/upload-profile-image', PostProfileImage);
module.exports = router;
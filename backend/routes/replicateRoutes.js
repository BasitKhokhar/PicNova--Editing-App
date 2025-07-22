const express = require('express');
const router = express.Router();
const { enhanceImage, getEnhancedImages } = require('../controllers/replicateController');

router.post('/enhance', enhanceImage);
router.get('/enhanced-images', getEnhancedImages);

module.exports = router;
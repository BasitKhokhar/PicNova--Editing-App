const express = require('express');
const router = express.Router();
const { getFAQs, getLogoImage, getSliderImages, getSocialIcons } = require('../controllers/contentController');

router.get('/faqs', getFAQs);
router.get('/logo_image', getLogoImage);
router.get('/sliderimages', getSliderImages);
router.get('/social-icons', getSocialIcons);

module.exports = router;
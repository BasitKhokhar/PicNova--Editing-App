const express = require('express');
const router = express.Router();
const { getFAQs, getLogoImage, getSliderImages, getSocialIcons,getPaymentBtnImage } = require('../controllers/contentController');

router.get('/faqs', getFAQs);
router.get('/logo_image', getLogoImage);
router.get('/sliderimages', getSliderImages);
router.get('/paymentbtnimage', getPaymentBtnImage);
router.get('/social-icons', getSocialIcons);

module.exports = router;
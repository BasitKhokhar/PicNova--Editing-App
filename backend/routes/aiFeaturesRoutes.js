const express = require('express');
const router = express.Router();

const {
  getAllFeatures,
  getSubfeaturesByFeatureId,
} = require('../controllers/aiFeaturesController');

// Route to get all features
router.get('/ai_pics_Featureslist', getAllFeatures);

// Route to get subfeatures by feature ID
router.get('/ai_subfeatures/:featureId', getSubfeaturesByFeatureId);

module.exports = router;

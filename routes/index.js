const router = require('express').Router();
const { getAds, getAd } = require('../controllers');

router
  .get('/', getAds)
  .get('/:Id', getAd);

module.exports = router;

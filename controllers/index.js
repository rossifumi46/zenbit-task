const Ad = require('../models/ad');

module.exports.getAds = (req, res, next) => {
  Ad.find()
    .then((ads) => res.send({ ads }))
    .catch(next);
};

module.exports.getAd = (req, res, next) => {
  const { Id } = req.params;
  Ad.findOne({ olxId: Id })
    .orFail(() => res.status(404).send({ message: 'Не найдено'}))
    .then((ad) => res.send({ ad }))
    .catch(next);
};

/*jshint esversion:6*/
const router = require('express').Router();
const Like = require('../models/Like');
const Beer = require('../models/Beer');

router.post('/', (req, res, next) => {
  Like.findOne({
      beer_id: req.body.beerId,
      user_id: req.body.userId
    })
    .exec()
    .then(likeOne => {
      let like = new Like({
        user_id: req.body.userId,
        beer_id: req.body.beerId,
      });

      let update = {
        like: req.like
      };

      like.save((err, obj) => {
        Beer.update({
          _id: req.body.beerId
        }, {
          $inc: {
            likes: 1
          }
        }, (err, beer) => {
          if (err) {
            return next(err);
          }
        });
      });
    })
    .then(res.send({
      response: "ok"
    }));
});

module.exports = router;

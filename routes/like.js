const router = require('express').Router();
const Like = require('../models/Like');

router.get('/', (req, res, next) => {
  console.log(req.body);

  let likeInfo = new Like({
    user_id: req.body.userId,
    beer_id: req.body.beerId
  });
  likeInfo.save( (err, obj) => {
    console.log("vote saved");
  })
  .then( res.send({response: "ok"}));
});

module.exports = router;

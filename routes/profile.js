/*jshint esversion:6*/
const express = require('express');
const router = express.Router();
const passport = require('passport');
// const BeerModel = require('../models/beer');
// const multer = require('multer');
//
// const upload = multer({ dest: './public/uploads/' });
const User = require('../models/user');
const Beer = require('../models/Beer');
const Likes = require('../models/Like');


const {
  ensureLoggedIn,
  ensureLoggedOut
} = require('connect-ensure-login');

router.get('/profile', ensureLoggedIn('/'), (req, res) => {

  Beer.find({
    'breweryId': `${req.user._id}`
  }, (err, beer) => {

  if (err) return handleError(err);
  Beer.find({
  }, (err, beerS) => {

  if (err) return handleError(err);
    Likes.find({
      'user_id': `${req.user._id}`
    }, (err, like) => {

      if (err) return handleError(err);
      console.log(like);

      res.render('profile', {
        user: req.user,
        userS: req.user,
        beer,
        beerS,
        like
      });
    });
    });
    });

});

router.get('/profile/:id', ensureLoggedIn('/'), (req, res, next) => {
  User.findById(req.params.id, (err, user) => {

    if (err) {
      return next(err);
    }
    Beer.find({
      'breweryId': `${req.params.id}`
    }, (err, beer) => {

      if (err) return handleError(err);
      console.log(beer);

      Likes.find({
        'beer_id': `${req.params.id}`
      }, (err, like) => {

        if (err) return handleError(err);
        console.log(beer);
        res.render('profile', {
          userS: req.user,
          user: user,
          beer,
          like
        });

      });
    });

  });




});

module.exports = router;

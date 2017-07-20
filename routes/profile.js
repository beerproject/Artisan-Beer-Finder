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


const {
  ensureLoggedIn,
  ensureLoggedOut
} = require('connect-ensure-login');

router.get('/profile', ensureLoggedIn('/'), (req, res) => {

  Beer.find({
    'breweryId': `${req.user._id}`
  }, (err, beer) => {

    if (err) return handleError(err);


    res.render('profile', {
      user:req.user,
      userS: req.user,
      beer
    });
  });
});



router.get('/profile/:id', (req, res, next) => {
  User.findById(req.params.id, (err, user) => {

    if (err) {
      return next(err);
    }
    Beer.find({
      'breweryId': `${req.params.id}`
    }, (err, beer) => {

      if (err) return handleError(err);
      console.log(beer);
      res.render('profile', {
        userS:req.user,
        user: user,
        beer
      });
    });

  });




});

module.exports = router;

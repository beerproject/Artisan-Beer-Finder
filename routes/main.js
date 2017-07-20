/*jshint esversion:6*/
const express = require('express');
const router = express.Router();
const passport = require('passport');




const Beer = require('../models/Beer');


const {
  ensureLoggedIn,
  ensureLoggedOut
} = require('connect-ensure-login');


router.get('/main', ensureLoggedIn('/'), (req, res) => {

  Beer.find({}, (err, beer) => {

    if (err) return handleError(err);
    
    res.render('main', {
      user: req.user,
      beer
    });
  });
});

module.exports = router;

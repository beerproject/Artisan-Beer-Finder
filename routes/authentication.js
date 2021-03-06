/*jshint esversion:6*/
const express = require('express');
const router = express.Router();
const passport = require('passport');
const multer = require('multer');

const upload = multer({ dest: './public/uploads/' });
const User = require('../models/user');

const {
  ensureLoggedIn,
  ensureLoggedOut
} = require('connect-ensure-login');


router.get('/', ensureLoggedOut('/profile'), (req, res) => {
  res.render('index', {
    message: req.flash('error')
  });
});

router.post('/login', ensureLoggedOut(), passport.authenticate('local-login', {
  successRedirect: '/profile',
  failureRedirect: '/',
  failureFlash: true
}));

router.post('/signup',upload.single('photo'), ensureLoggedOut(), passport.authenticate('local-signup', {
  successRedirect: '/profile',
  failureRedirect: '/signup',
  failureFlash: true
}));

router.get('/logout', ensureLoggedIn('/'), (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;

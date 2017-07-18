const express = require('express');
const passport = require('passport');
const multer = require('multer');

const upload = multer({ dest: './public/uploads/' });
const User = require('../models/User');
const router = express.Router();
const {
  ensureLoggedIn,
  ensureLoggedOut
} = require('connect-ensure-login');

router.get('/posts',  (req, res) => {
  res.render('', {
    user: req.user
  });
});
module.exports = router;

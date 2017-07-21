/*jshint esversion:6*/
const express = require('express');
const router = express.Router();
const multer = require('multer');
const passport = require('passport');

const upload = multer({
  dest: './public/uploads/'
});

const Beer = require('../models/Beer');

const {
  ensureLoggedIn,
  ensureLoggedOut
} = require('connect-ensure-login');

router.get('/new',ensureLoggedIn('/'), (req, res, next) => {
  res.render('beer/newBeer', {
    title: 'New Beer'
  });
});

router.post('/new',upload.single('photo'), (req, res, next) => {
  const name = req.body.name;
  const style = req.body.style;
  const standardReferenceMethod = req.body.standardReferenceMethod;
  const alcoholByVolume = req.body.alcoholByVolume;
  const internationalBitteringUnits = req.body.internationalBitteringUnits;
  const description = req.body.description;

  if (name === "" || style === "" || description === "") {
    res.render("beer/newBeer", {
      message: "Fill the form to add a beer"
    });
    return;
  }

  //beer already exists?

  const newBeer = Beer({
    name: name,
    style: style,
    standardReferenceMethod: standardReferenceMethod,
    alcoholByVolume: alcoholByVolume,
    internationalBitteringUnits: internationalBitteringUnits,
    description: description,
    pic_name: req.file.filename,
    breweryId: req.user._id,
    breweryName:req.user.name,
    likes: 0
  });

  newBeer.save((err, obj) => {
    if (err) {
      res.render("beer/newBeer", {
        message: "Something went wrong"
      });
    } else {
      res.redirect(`/beer/${newBeer._id}`);
    }
  });
});

router.get('/:id',ensureLoggedIn('/'), (req, res, next) => {
  Beer.findById(req.params.id, (err, beer) => {
    if (err) {
      return next(err);
    }
    res.render('beer/beer', {
      beer: beer,
      user:req.user
    });
  });
});

router.get('/:id/edit',ensureLoggedIn('/'), (req, res, next) => {
  Beer.findById(req.params.id, (err, beer) => {
    if (err) {
      return next(err);
    }
    res.render('beer/editBeer', {
      beer: beer
    });
  });
});

router.post('/:id/edit',upload.single('photo'),ensureLoggedIn('/'), (req, res, next) => {
  const beerId = req.params.id;

  const updates = {
    name: req.body.name,
    style: req.body.style,
    standardReferenceMethod: req.body.standardReferenceMethod,
    alcoholByVolume: req.body.alcoholByVolume,
    internationalBitteringUnits: req.body.internationalBitteringUnits,
    description: req.body.description,
    // pic_name: req.file.filename,

  };

  Beer.findByIdAndUpdate(beerId, updates, (err, product) => {
    if (err) {
      return next(err);
    }
    res.redirect(`/beer/${beerId}`);
  });
});

router.post('/:id/delete',ensureLoggedIn('/'), (req, res, next) => {
  Beer.findByIdAndRemove(req.params.id, (err, beer) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

module.exports = router;

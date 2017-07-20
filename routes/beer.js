const express = require('express');
const router = express.Router();

const Beer = require('../models/Beer');

router.get('/new', (req, res, next) => {
  res.render('beer/newBeer', { title: 'New Beer' });
});

router.post('/new', (req, res, next) => {
  const name = req.body.name;
  const style = req.body.style;
  const standardReferenceMethod = req.body.standardReferenceMethod;
  const alcoholByVolume = req.body.alcoholByVolume;
  const internationalBitteringUnits = req.body.internationalBitteringUnits;
  const description = req.body.description;

  if (name === "" || style === "" || description === "") {
    res.render("beer/newBeer", { message: "Fill the form to add a beer" });
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
    votes: 0
  });

  newBeer.save((err, obj) => {
    if (err) {
      res.render("beer/newBeer", { message: "Something went wrong" });
    } else {
      res.redirect(`/beer/${newBeer._id}`);
    }
  });
});

router.get('/:id', (req, res, next) => {
  Beer.findById(req.params.id, (err, beer) => {
    if (err) {
      return next(err);
    }
    res.render('beer/beer', {
      beer: beer
    });
  });
});

router.get('/:id/edit', (req, res, next) => {
  Beer.findById(req.params.id, (err, beer) => {
    if (err) {
      return next(err);
    }
    res.render('beer/editBeer', {
      beer: beer
    });
  });
});

router.post('/:id/edit', (req, res, next) => {
  const beerId = req.params.id;

  const updates = {
      name: req.body.name,
      style: req.body.style,
      standardReferenceMethod: req.body.standardReferenceMethod,
      alcoholByVolume: req.body.alcoholByVolume,
      internationalBitteringUnits: req.body.internationalBitteringUnits,
      description: req.body.description
  };

  Beer.findByIdAndUpdate(beerId, updates, (err, product) => {
    if (err){ return next(err); }
    res.redirect(`/beer/${beerId}`);
  });
});

router.post('/:id/delete', (req, res, next) => {
  Beer.findByIdAndRemove(req.params.id, (err, beer) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

module.exports = router;

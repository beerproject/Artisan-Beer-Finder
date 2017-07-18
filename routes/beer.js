const express = require('express');
const router = express.Router();

const Beer = require('../models/Beer');

router.get('/new', (req, res, next) => {
  res.render('newBeer', { title: 'New Beer' });
});

router.post('/new', (req, res, next) => {
  const name = req.body.name;
  const style = req.body.style;
  const standardReferenceMethod = req.body.standardReferenceMethod;
  const alcoholByVolume = req.body.alcoholByVolume;
  const internationalBitteringUnits = req.body.internationalBitteringUnits;
  const description = req.body.description;

  if (name === "" || style === "" || description === "") {
    res.render("newBeer", { message: "Fill the form to add a beer" });
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
    rating: null
  });

  newBeer.save((err, obj) => {
    if (err) {
      res.render("newBeer", { message: "Something went wrong" });
      console.log(err);
    } else {
      res.redirect("/");
    }
  });

});

module.exports = router;

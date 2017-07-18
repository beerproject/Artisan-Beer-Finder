const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const beerSchema = new Schema({
  name: String,
  style: {
    type: String,
    required: true,
    enum: [
      'Altbier',
      'Amber Ale',
      'Barley Wine',
      'Berliner Weiße',
      'Bière de Garde',
      'Bitter',
      'Blonde Ale',
      'Bock',
      'Brown Ale',
      'Cream Ale',
      'Dortmunder Export',
      'Doppelbock',
      'Dunkel',
      'Dunkelweizen',
      'Eisbock',
      'Flanders Red Ale',
      'Geuze',
      'Golden Ale',
      'Gose',
      'Hefeweizen',
      'Helles',
      'India Pale Ale',
      'Kölsch',
      'Lambic',
      'Light Ale',
      'Maibock',
      'Malt Liquor',
      'Märzenbier',
      'Mild Ale',
      'Old Ale',
      'Oud Bruin',
      'Pale Ale',
      'Pilsner',
      'Porter',
      'Red Ale',
      'Roggenbier',
      'Saison',
      'Scotch Ale',
      'Steam Beer',
      'Stout',
      'Schwarzbier',
      'Vienna Lager',
      'Witbier',
      'Weißbier',
      'Weizenbock'
    ]
  },
  standardReferenceMethod: {
    type: Number,
    min: 1,
    max: 40,
    required: true
  },
  alcoholByVolume: {
    type: Number,
    required: true
  },
  internationalBitteringUnits: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  }
  //brewery
  //beerphoto
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Beer = mongoose.model('Beer', beerSchema);
module.exports = Beer;

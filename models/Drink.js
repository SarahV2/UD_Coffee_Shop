const mongoose = require('mongoose');

const drinkSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  recipe: {
    type: [Object],
    required: false,
  },
});

const Drink = mongoose.model('Drink', drinkSchema);
module.exports = Drink;

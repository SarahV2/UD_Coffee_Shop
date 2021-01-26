const express = require('express');
const router = express.Router();
const Drink = require('../../models/Drink');
const { check, validationResult } = require('express-validator');

// @route GET api/drinks
// @desc Get all drinks
// @access Public

router.get('/', async (req, res) => {
  try {
    const drinks = await Drink.find();
    console.log(drinks);
    return res.json(drinks);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server Error' });
  }
});

// @route   POST api/drinks
// @desc    Add a new drink
// @access  Private (public as of now)

router.post(
  '/',
  [check('title', 'title is required').not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const drinkExists = await Drink.findOne({ title: req.body.title });
      if (drinkExists) {
        return res.status(400).json({ message: 'Drink title must be unique' });
      }
      const newDrink = new Drink({
        title: req.body.title,
        recipe: req.body.recipe,
      });

      const drink = await newDrink.save();
      return res.json(drink);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server Error' });
    }
  }
);

module.exports = router;

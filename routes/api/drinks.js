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
  [
    check('title', 'title is required').not().isEmpty(),
    check('recipe', "drink's recipe is required").not().isEmpty(),
  ],
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

// @route   PATCH api/drinks/:id
// @desc    Update drink's info
// @access  Private (public as of now)

router.patch(
  '/:drink_id',
  [
    check('title', 'title is required').not().isEmpty(),
    check('recipe', "drink's recipe is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const drink = await Drink.findById(req.params.drink_id);
      if (!drink) {
        return res.status(404).json({ message: 'Not found' });
      }
      drink.title = req.body.title;
      drink.recipe = req.body.recipe;

      const updated_drink = await drink.save();
      return res.json(updated_drink);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server Error' });
    }
  }
);

// @route   DELETE api/drinks/:id
// @desc    Delete a drink
// @access  Private (public as of now)

router.delete('/:drink_id', async (req, res) => {
  try {
    const drink = await Drink.findByIdAndDelete(req.params.drink_id);
    if (!drink) {
      return res.status(404).json({ message: 'Not found' });
    }
    return res.json({message:'Drink data was successfully removed!'})
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;

'use strict';

const express = require('express');

const router = express.Router();
const { ingredients } = require('../models');

router.get('/ingredient', async (req, res, next) => {
  let ingredient = await ingredients.read();

  res.status(200).send(ingredient);

});

router.get('/ingredient/:id', async (req, res, next) => {
  let singleIngredient = await ingredients.read(req.params.id);

  res.status(200).send(singleIngredient);

});


router.delete('/ingredient/:id', async (req, res, next) => {
  try {
    let deletedIngredient = await ingredients.delete(req.params.id);
    res.status(200).send(deletedIngredient);
  } catch (e) {
    next(e);
  }

});
router.put('/ingredient/:id', async (req, res, next) => {
  try {
    let updatedIngredient = await ingredients.update(req.body, req.params.id);
    res.status(201).send(updatedIngredient);
  } catch (error) {
    next(error);
  }

});

router.post('/ingredient', async (req, res, next) => {
  let newIngredient = await ingredients.create(req.body);

  res.status(200).send(newIngredient);
});

module.exports = router;


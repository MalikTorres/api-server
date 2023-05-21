'use strict';

const express = require('express');

const router = express.Router();
const { food, ingredients } = require('../models');

router.get('/food', async (req, res, next) => {
  let foods = await food.read();

  res.status(200).send(foods);

});

router.get('/food/:id', async (req, res, next) => {
  let singleFood = await food.read(req.params.id);

  res.status(200).send(singleFood);

});

// Router with ingredients, relational aspect
router.get('/foodWithIngredients', async (req, res, next) => {
  let foods = await food.read(null,{ include: { model: ingredients.model} });

  res.status(200).send(foods);

});

// Assiging first argument to null as the first parameter in collections takes in a null value before reaching the options object
router.get('/foodWithSingleIngredient/:id', async (req, res, next) => {
  let foods = await food.read(null,{
    include: { model: ingredients.model },
    where: { id: req.params.id },
  });

  res.status(200).send(foods);

});

router.delete('/food/:id', async (req, res, next) => {
  try {
    let deletedFood = await food.delete(req.params.id);
    res.status(200).send(deletedFood);
  } catch (e) {
    next(e);
  }

});


router.put('/food/:id', async (req, res, next) => {
  try {
    let updatedFood = await food.update(req.body, req.params.id);
    res.status(201).send(updatedFood);
  } catch (error) {
    next(error);
  }

});

router.post('/food', async (req, res, next) => {
  let newFood = await food.create(req.body);

  res.status(200).send(newFood);
});



module.exports = router;

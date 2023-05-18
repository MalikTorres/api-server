'use strict';

const express = require('express');

const router = express.Router();
const { foodModel } = require('../models/');

router.get('/food', async (req, res, next) => {
  let foods = await foodModel.findAll();

  res.status(200).send(foods);

});

router.get('/food/:id', async (req, res, next) => {
  let singleFood = await foodModel.findAll({ where: { id: req.params.id } });

  res.status(200).send(singleFood);

});

// router.delete('/food/:id', async (req, res, next) => {

// });


router.put('/food/:id', async (req, res, next) => {
  try {
    let foodId = req.params.id;
    console.log('Id value:', foodId);
    let data = req.body;

    await foodModel.update(data, {
      where: {
        id: foodId,
      },
    });
    let updatedFood = await foodModel.findAll({ where: { id: req.params.id } });
    res.status(201).send(updatedFood);

  } catch (error) {
    next(error);
  }

});

router.post('/food', async (req, res, next) => {
  let newFood = await foodModel.create(req.body);

  res.status(200).send(newFood);
});



module.exports = router;
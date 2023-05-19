'use strict';

const express = require('express');

const router = express.Router();
const { ingredientsModel } = require('../models');

router.get('/ingredient', async (req, res, next) => {
  let ingredients = await ingredientsModel.findAll();

  res.status(200).send(ingredients);

});

router.get('/ingredient/:id', async (req, res, next) => {
  let singleIngredient = await ingredientsModel.findAll({ where: { id: req.params.id } });

  res.status(200).send(singleIngredient);

});


router.delete('/ingredient/:id', async(req,res,next)=>{
  try {
    let deletedIngredient = await ingredientsModel.findByPk(req.params.id);
    await ingredientsModel.destroy({where: {id: req.params.id}});

    res.status(200).send(deletedIngredient);

  } catch (e) {
    next(e);
  }

});



router.put('/ingredient/:id', async (req, res, next) => {
  try {
    let ingredientId = req.params.id;
    console.log('Id value:', ingredientId);
    let data = req.body;

    await ingredientsModel.update(data, {
      where: {
        id: ingredientId,
      },
    });
    let updatedIngredient = await ingredientsModel.findAll({ where: { id: req.params.id } });
    res.status(201).send(updatedIngredient);

  } catch (error) {
    next(error);
  }

});

router.post('/ingredient', async (req, res, next) => {
  let newIngredient = await ingredientsModel.create(req.body);

  res.status(200).send(newIngredient);
});

module.exports = router;

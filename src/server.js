'use strict';

const express = require('express');
const cors = require('cors');
const foodsRouter = require('./routes/food');
const ingredientsRouter = require('./routes/ingredients');



const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res, next) => {
  res.status(200).send('proof of life');
});

app.use(foodsRouter);
app.use(ingredientsRouter);

// DONE: get customer Router Working(demo notes)

const start = port => {
  app.listen(port, () => console.log('server running on', port));
};

module.exports = {
  app,
  start,
};

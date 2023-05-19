'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const foods = require('./food');
const ingredients = require('./ingredients');

// not test friendly
//const DATABASE_URL = process.env.DATABASE_URL;
//Will make dynamic for testing envionrment(notes from demo)
const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite ::memory:' : process.env.DATABASE_URL;

// database singleton(One instance of our sequelized database)
const sequelizeDatabase = new Sequelize(DATABASE_URL);


// create our working and connected food database model
const foodModel = foods(sequelizeDatabase, DataTypes);

const ingredientsModel = ingredients(sequelizeDatabase, DataTypes);


// create associations
foodModel.hasMany(ingredientsModel);
ingredientsModel.belongsTo(foodModel);

module.exports = {
  sequelizeDatabase,
  foodModel,
  ingredientsModel,
};


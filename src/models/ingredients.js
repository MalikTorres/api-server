'use strict';

module.exports = (sequelizeDatabase, Datatypes) => {
  // food WILL BE the name of the table created, pularalized(Notes from recording)
  // each property: name and count correspond to a column in the database
  return sequelizeDatabase.define('ingredients', {
    name: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    count: {
      type: Datatypes.INTEGER,
      allowNull: true,
    },
    foodId: {
      type: Datatypes.INTEGER,
      allowNull: true,
    },
  });
};

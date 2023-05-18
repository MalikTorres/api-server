'use strict';

module.exports = (sequelizeDatabase, DataTypes) => {
  // food WILL BE the name of the table created, pularalized(Notes from recording)
  // each property: name and flavor correspond to a column in the database
  return sequelizeDatabase.define('foods', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    flavor: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
};
 
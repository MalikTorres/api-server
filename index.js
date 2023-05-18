'use strict';

require('dotenv').config();
const { sequelizeDatabase } = require('./src/models');
const { start } = require('./src/server')

const PORT = process.env.PORT || 3010;

sequelizeDatabase.sync()
  .then(() => {
    //based on demo code
    console.log('Successful Connection');
    // start server here
    start(PORT);
  })
  .catch(e => console.error(e));


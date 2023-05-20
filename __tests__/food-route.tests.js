'use strict';

const supertest = require('supertest');

const { app } = require('../src/server');

const { sequelizeDatabase } = require('../src/models');


const request = supertest(app);

beforeAll(async () => {
  await sequelizeDatabase.sync();
});

afterAll( async () => {
  await sequelizeDatabase.drop();
});

describe('Food router', () => {
  test('handles create route', async () => {
    const response = await request.post('/food').send({name: 'test', flavor: 'test'});
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('test');
  });
});

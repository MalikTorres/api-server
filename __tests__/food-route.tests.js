'use strict';

const supertest = require('supertest');

const { app } = require('../src/server');

const { sequelizeDatabase } = require('../src/models');


const request = supertest(app);

beforeAll(async () => {
  await sequelizeDatabase.sync();
});

afterAll(async () => {
  await sequelizeDatabase.drop();
});
// CRUD TEST
// POST
describe('Food router', () => {
  test('handles create route', async () => {
    let response = await request.post('/food').send({
      name: 'test',
      flavor: 'test',
    });
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('test');
    expect(response.body.flavor).toEqual('test');
  });
  // GET
  test('gets all food', async () => {
    let response = await request.get('/food');

    expect(response.status).toEqual(200);
    // Getting food from the first index inside the array which is an object
    expect(response.body[0].name).toEqual('test');
    expect(response.body[0].flavor).toEqual('test');
  });
  // GET ONE
  test('gets single food', async () => {
    let response = await request.get('/food/1');

    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('test');
    expect(response.body.flavor).toEqual('test');
  });
  // UPDATE
  test('handles update route', async () => {
    let response = await request.put('/food/1').send({
      name: 'test',
      flavor: 'New Test',
    });
    expect(response.status).toEqual(201);
    expect(response.body.name).toEqual('test');
    expect(response.body.flavor).toEqual('New Test');
  });

  test('handles delete route', async () => {
    let response = await request.delete('/food/1');
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('test');
    expect(response.body.flavor).toEqual('New Test');

    response = await request.get('/food');
    
    // Expecting the array to be empty adding value updating and then finally deleting. Meaning there's nothing left in the database
    expect(response.body.length).toEqual(0);
  });
});

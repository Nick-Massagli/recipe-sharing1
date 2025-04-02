const server = require('../server')
const supertest = require('supertest');
const { expect } = require('@jest/globals');
const request = supertest(server)
//const connectDB = require('../db/connect');
//const mongoose = require('mongoose');



describe('Test Handlers', () => {
 
   // test('responds to /', async () => { 

    test('responds to /recipe', async () => {
        const res = await request.get('/recipe');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200)
        expect(Array.isArray(response.body)).toBe(true);
    }, 10000);

    //test('responds to /recipe/:id', async () => {
    //    const res = await request.get('/recipe/67d6077c1d3bd282b0bc0f2e');
    //    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    //    expect(res.statusCode).toBe(200)
    //})

   // test('responds to post /recipe', async () => {
    //    const res = await request.post('/recipe').send(
   //         {
    //        firstName: "Emily",
    //        lastName: "Button",
    //        email: "emilyButton@gmail.com",
    //        username: "embutton",
    //    });
    //    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    //    expect(res.statusCode).toBe(201)
   // })

    test('responds to put /recipe/:id', async () => {
        const res = await request.put('/recipe/67d855cb4429c99829059bc4').send(
            {
            firstName: "Emily",
            lastName: "Button",
            email: "any",
            username: "embutton",
});
expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(204)
})

test('responds to delete /recipe/:id', async () => {
    const res = await request.delete('/recipe/67df3cb93a2f4bdbfaf7709e');
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(204)
})
})
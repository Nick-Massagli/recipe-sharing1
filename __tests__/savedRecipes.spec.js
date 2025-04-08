const server = require('../server')
const supertest = require('supertest');
const { expect, afterEach } = require('@jest/globals');
const request = supertest(server)
const connectDB = require('../db/connect');
const mongoose = require('mongoose');



describe('Test Handlers', () => {

    //afterEach(async () => {
        // Close the database connection
       // await mongoose.connection.close();
        // Close the server
       //  server.end();
       // await connectDB.close();
   // })
 
   // test('responds to /', async () => { 

    test('responds to /recipe', async () => {
        const res = await request.get('/savedRecipe');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200)
        expect(Array.isArray(response.body)).toBe(true);
    }, 10000);

    test('responds to /recipe/:id', async () => {
        const res = await request.get('/savedRecipe/67df32382242b0f935a68881');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200)
    })

    test('responds to post /recipe', async () => {
        const res = await request.post('/savedRecipe').send(
            {
                recipe: "67df32382242b0f935a68881",
                user: "67df32382242b0f935a68881",
            });
        
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(201)
    })

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
    const res = await request.delete('/savedRecipe/67dee9b3c4d6ed8a6736df2');
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(204)
})
})
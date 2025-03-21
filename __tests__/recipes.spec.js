const server = require('../server')
const supertest = require('supertest');
const { expect } = require('@jest/globals');
const request = supertest(server)

describe('Test Handlers', () => {
 

    test('responds to /users', async () => {
        const res = await request.get('/recipes');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200)
    })

    test('responds to /recipe/:id', async () => {
        const res = await request.get('/recipe/67d62fe58648e07250d53b77');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200)
    })

    test('responds to post /recipe', async () => {
        const res = await request.post('/recipe').send(
            {
            firstName: "Emily",
            lastName: "Button",
            email: "emilyButton@gmail.com",
            username: "embutton",
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
    const res = await request.delete('/recipe/67dc2e9e49cf5201e572efad');
    //expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(204)
})
})
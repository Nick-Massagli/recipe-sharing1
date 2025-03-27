const server = require('../server')
const supertest = require('supertest');
const { expect } = require('@jest/globals');
const request = supertest(server)

describe('Test Handlers', () => {
    test('responds to /', async () => {
        const res = await request.get('/');
        expect(res.header['content-type']).toBe('text/html; charset=utf-8');
        expect(res.statusCode).toBe(200)
    })

    test('responds to /users', async () => {
        const res = await request.get('/users');
        expect(res.header['content-type']).toBe('text/html; charset=utf-8');
        expect(res.statusCode).toBe(200)
    })

    test('responds to /users/:id', async () => {
        const res = await request.get('/users/67d62fe58648e07250d53b77');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200)
    })

    test('responds to post /users', async () => {
        const res = await request.post('/users').send(
            {
            firstName: "Emily",
            lastName: "Button",
            email: "emilyButton@gmail.com",
            username: "embutton",
        });
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(201)
    })

    test('responds to put /users/:id', async () => {
        const res = await request.put('/users/67d855cb4429c99829059bc4').send(
            {
            firstName: "Emily",
            lastName: "Button",
            email: "any",
            username: "embutton",
});
expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200)
})

test('responds to delete /users/:id', async () => {
    const res = await request.delete('/users/67dc2e9e49cf5201e572efad');
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(204)
})
})
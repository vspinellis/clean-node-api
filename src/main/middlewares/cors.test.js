const request = require('supertest')
const { app } = require('../app')

describe('Cors Middleware', () => {
  test('deve enable cors', async () => {
    const res = await request(app).get('/test_cors')
    expect(res.headers['access-control-allow-origin']).toBe('*')
    expect(res.headers['access-control-allow-methods']).toBe('*')
    expect(res.headers['access-control-allow-headers']).toBe('*')
  })
})

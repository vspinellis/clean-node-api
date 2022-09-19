const request = require('supertest')
const { app } = require('../app')

describe('App Setup', () => {
  app.get('/test_x_powered_by', (req, res) => {
    res.send('')
  })
  test('deve desabilitar o x-powered-by header', async () => {
    const res = await request(app).get('/test_x_powered_by')
    expect(res.headers['x-powered-by']).toBeUndefined()
  })

  test('deve enable cors', async () => {
    const res = await request(app).get('/test_cors')
    expect(res.headers['access-control-allow-origin']).toBe('*')
    expect(res.headers['access-control-allow-methods']).toBe('*')
    expect(res.headers['access-control-allow-headers']).toBe('*')
  })
})

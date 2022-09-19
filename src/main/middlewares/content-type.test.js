const request = require('supertest')
const { app } = require('../app')

describe('Json Parser', () => {
  test('deve habilitar content type padrao json', async () => {
    app.get('/test_content_type', (req, res) => {
      res.send('')
    })
    await await request(app).get('/test_content_type').expect('content-type', /json/)
  })
})

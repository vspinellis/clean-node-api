const request = require('supertest')
const { app } = require('../app')

describe('Json Parser', () => {
  test('deve habilitar hoby parser para JSON', async () => {
    app.post('/test_json_parser', (req, res) => {
      res.send(req.body)
    })
    await await request(app).post('/test_json_parser').send({ test: 'JSON' }).expect({ test: 'JSON' })
  })
})

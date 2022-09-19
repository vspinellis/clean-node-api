const express = require('express')
const routes = require('./config/routes')
const setupApp = require('./config/setup')
const app = express()

setupApp(app)
routes(app)

module.exports = {
  app
}

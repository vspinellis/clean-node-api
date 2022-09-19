const cors = require('../middlewares/cors')
const express = require('express')
const contentType = require('../middlewares/content-type')

module.exports = app => {
  app.disable('x-powered-by')
  app.use(cors)
  app.use(express.json())
  app.use(contentType)
}

const mongoHelper = require('src/infra/helpers/mongo-helper')
const { app } = require('./app')

mongoHelper.connect('mongodb://localhost:27017/clean-node-api').then(() => {
  app.listen(3333, () => console.log('Server running'))
})

const { badRequestError } = require('./bad-request-error')
const { ok } = require('./ok')
const { serverError } = require('./server-error')
const { unauthorizedError } = require('./unauthorized-error')

module.exports = {
  badRequestError,
  ok,
  serverError,
  unauthorizedError
}

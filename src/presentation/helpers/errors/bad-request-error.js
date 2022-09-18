const badRequest = (message) => {
  return {
    statusCode: 400,
    body: message
  }
}

module.exports = {
  badRequest
}

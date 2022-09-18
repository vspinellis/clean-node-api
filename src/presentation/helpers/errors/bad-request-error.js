const badRequestError = (message) => {
  return {
    statusCode: 400,
    body: message
  }
}

module.exports = {
  badRequestError
}

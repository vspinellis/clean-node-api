const unauthorizedError = (error) => {
  return {
    statusCode: 401,
    body: error
  }
}

module.exports = {
  unauthorizedError
}

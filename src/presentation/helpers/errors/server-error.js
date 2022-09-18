const serverError = () => {
  return {
    statusCode: 500,
    body: 'Erro interno do servidor!'
  }
}

module.exports = {
  serverError
}

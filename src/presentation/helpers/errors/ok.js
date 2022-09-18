const ok = (data = null) => {
  return {
    statusCode: 200,
    body: data
  }
}

module.exports = {
  ok
}

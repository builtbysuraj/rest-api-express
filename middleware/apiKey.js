const ErrorHandler = require("../errors/ErrorHandler");

const apiKey = (req, res, next) => {
  const api_key = '123456';
  const userApi = req.query.api_key
  if (userApi && (userApi === api_key))
    next()
  else
    next(ErrorHandler.forbidden())
}

module.exports = apiKey

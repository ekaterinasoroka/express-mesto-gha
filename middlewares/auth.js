const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, process.env.NODE_ENV);
  } catch (error) {
    next(new UnauthorizedError('Ошибка авторизации'));
  }
  req.users = payload;
  next();
};

module.exports = auth;

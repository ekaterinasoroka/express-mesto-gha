const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, 'SECRET');
  } catch (error) {
    next(error);
  }
  req.users = payload;
  next();
};

module.exports = auth;

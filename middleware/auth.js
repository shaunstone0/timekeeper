const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
  // Get Token
  const token = req.header('x-auth-token');
  // Check if No Token
  if (!token) {
    return res.status(401).json({ msg: 'Not Authorized To View' });
  }

  // verify Token

  try {
    const decode = jwt.verify(token, config.get('jwtSecret'));
    req.user = decode.user;
    next();
  } catch (err) {
    res.status(401, json({ msg: 'Token is not Valid' }));
  }
};

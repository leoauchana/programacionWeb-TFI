const jwt = require("jsonwebtoken");
require('dotenv').config();
const TOKEN_SECRET = process.env.TOKEN_SECRET;
const validateBodyRegister = (req, res, next) => {
  const name = req.body.name;
  const lastName = req.body.lastName;
  const user = req.body.userName;
  const password = req.body.password;

  if (!name) {
    return res.status(404).json({ message: `Name is required for register` });
  }
  if (!lastName) {
    return res
      .status(404)
      .json({ message: `LastName is required for register` });
  }
  if (!user) {
    return res.status(404).json({ message: `User is required for register` });
  }
  if (!password) {
    return res
      .status(404)
      .json({ message: `Password is required for register` });
  }
  next();
};

const validateToken = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ message: `No token, autrhorization denied` });
  }

  jwt.verify(token, TOKEN_SECRET,(err, user) => {
    if (err) return res.status(403).json({ message: `Invalid Token` });
    
      req.user = user;
    
      next();
  });
};
module.exports = {
  validateBodyRegister,
  validateToken,
};

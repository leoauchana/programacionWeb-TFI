const { createUser, validateUser, getById } = require("../services/authService");
const { createAccessToken } = require("../libs/jwt");
const jwt = require("jsonwebtoken");
const TOKEN_SECRET = process.env.TOKEN_SECRET;

const register = async (req, res) => {
  try {
    const newUser = await createUser(req.body);
    res.json(newUser);
  } catch (err) {
    console.error(`${err.message}`);
    res.status(400).json({ message: `${err.message}` });
  }
};

const login = async (req, res) => {
  try {
    const userFound = await validateUser(req.body);
    console.log(userFound);
    const token = await createAccessToken({ id: userFound.id });
    res.cookie("token", token);
    res.json(userFound);
  } catch (err) {
    res.status(400).json({ message: `${err.message}` });
  }
};

const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if(!token) return res.status(401).json({message: `Unauthorized`});

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if(err) return res.status(401).json({message: `Unauthorized`});
    const userFound = await getById(user.id);
    console.log(userFound);
    if(!userFound) return res.status(401).json({message: `Unauthorized`});
    return res.json({
      id: userFound.id,
      name: userFound.name,
      lastName: user.lastName
    });
  });
};

module.exports = {
  register,
  login,
  verifyToken,
};

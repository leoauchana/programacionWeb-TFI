const { createUser, validateUser, getById } = require("../services/authService");
const { createAccessToken } = require("../libs/jwt");
import jwt from 'jsonwebtoken';
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
    res.cookie("token", token, {
      sameSite: none,
    });
    res.json(userFound);
  } catch (err) {
    res.status(400).json({ message: `${err.message}` });
  }
};

const logOut = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.status(200).json({ message: `Session expired` });
};

const profile = (req, res) => {
  console.log(req.user);
};

const verifyToken = () => {
  const { token } = req.cookies;
  if(!token) return res.status(401).json({message: `Unauthorized`});

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if(err) return res.status(401).json({message: `Unauthorized`});
    const userFound = await getById(user.id);
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
  logOut,
  profile,
  verifyToken,
};

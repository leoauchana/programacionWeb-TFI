const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Users = require('../models/users');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

module.exports.login = async (req, res) => {
  const { userName, password } = req.body;

  try {
    if (!userName || !password) {
      return res.status(400).json({ message: "Username and password are required." });
    }

    const user = await Users.findOne({ where: { userName } });
    //console.log("User found:", user);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    //console.log("Password valid:", isPasswordValid);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign({ id: user.id, userName: user.userName }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.json({ token, message: "Login successful." });
  } catch (err) {
    console.error(`Error in login controller: ${err.message}`);
    return res.status(500).json({ message: "Internal server error." });
  }
};

module.exports.register = async (req, res) => {
  try {

    const { userName, password } = req.body;
  
    if (!userName || !password) {
      return res.status(400).json({ message: "usuario y contraseña requeridos" });
    }
  
    //para q no haya usuarios duplicados
    const existingUser = await Users.findOne({ where: { userName } });
    if (existingUser) {
      return res.status(409).json({ message: "usuario existente" });
    }
  
    //console.log("Password before hashing:", password);
    // encripta la contra
    const hashedPassword = await bcrypt.hash(password, 10);
    //console.log("Hashed password:", hashedPassword);

    const newUser = await Users.create({
      userName,
      password: hashedPassword,
    });
  
    return res.status(201).json({
      message: "User registered successfully.",
      user: { id: newUser.id, userName: newUser.userName },
    });
  } catch (err) {

      console.error(`Error in /register route: ${err.message}`);
      return res.status(500).json({ message: "Internal server error." });
  };
};
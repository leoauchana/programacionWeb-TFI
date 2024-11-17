const {Router} = require('express');
const bcrypt = require('bcrypt');
const Users = require('../models/users');
//const {createUser} = require('../services/authService');
require('dotenv').config();

const authRoute = Router();
const JWT_SECRET = process.env.JWT_SECRET;

authRoute.post('/register', async (req, res) => {
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
    
        // encripta la contra
        const hashedPassword = await bcrypt.hash(password, 10);
    
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
        }
  });


  authRoute.post('/login', async (req, res) => {
    try {
      const { userName, password } = req.body;
  
      if (!userName || !password) {
        return res.status(400).json({ message: "username y password requerido" });
      }
  
      const user = await Users.findOne({ where: { userName } });
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials." });
      }
  
      // generar token
      const token = jwt.sign({ id: user.id, userName: user.userName }, JWT_SECRET, {
        expiresIn: "1h",
      });
  
      return res.json({ message: "Login successful.", token });
    } catch (err) {
      console.error(`Error in /login: ${err.message}`);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
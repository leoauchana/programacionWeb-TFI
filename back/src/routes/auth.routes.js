const {Router} = require('express');
const bcrypt = require('bcrypt');
const Users = require('../models/users');
const { register, login, logOut, profile, verifyToken } = require('../controllers/auth.controller');
const { validateBodyRegister, validateToken } = require('../middleware/authMiddleware');
//const {createUser} = require('../services/authService');
require('dotenv').config();

const authRoute = Router();

authRoute.post('/register', validateBodyRegister, register);

authRoute.post('/login', login);

authRoute.get('/verify', verifyToken);

module.exports = authRoute;
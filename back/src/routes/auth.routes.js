const {Router} = require('express');
const bcrypt = require('bcrypt');
const Users = require('../models/users');
const jwt = require("jsonwebtoken");
const { login, register} = require("../controllers/auth.controller");
//const {createUser} = require('../services/authService');

const authRoute = Router();

authRoute.post('/register', register);

authRoute.post("/login", login);

module.exports = authRoute;
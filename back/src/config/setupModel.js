const Users = require('../models/users');
const Students = require('../models/students');
const {getInstance} = require('./setupDb');

const setupModel = async () => {
const instanceDb = await getInstance();
Users.init(instanceDb);
Students.init(instanceDb);
};


setupModel();
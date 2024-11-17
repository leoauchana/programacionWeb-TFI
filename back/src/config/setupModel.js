const Students = require('../models/students');
const Users = require('../models/users');
const {getInstance} = require('./setupDb');

const setupModel = async () => {
const instanceDb = await getInstance();
const students = Students.init(instanceDb);
const users = Users.init(instanceDb);

Students.associate({ Users: users });
Users.associate({ Students: students });
};


setupModel();
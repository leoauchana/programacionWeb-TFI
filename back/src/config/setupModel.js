const Students = require('../models/students');
const {getInstance} = require('./setupDb');

const setupModel = async () => {
const instanceDb = await getInstance();
Students.init(instanceDb);
};


setupModel();
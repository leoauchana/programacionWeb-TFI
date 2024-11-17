const {Router} = require('express');
const {validateBody, validateBySid} = require('../middleware/studentsMiddleware');
const { validateToken } = require('../middleware/authMiddleware');
const routerStudents = Router();
const { getAllStudents, createNewStudent, deleteNewStudent, getAll } = require('../controllers/students.controller');

routerStudents.get('/', validateToken, getAllStudents);

routerStudents.get('/getAll', validateToken, getAll);

routerStudents.post('/', validateToken, validateBody, createNewStudent);

routerStudents.delete('/:sid', validateToken, validateBySid, deleteNewStudent);


module.exports = routerStudents;
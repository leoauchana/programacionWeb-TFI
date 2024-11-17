const {
  getStudentsPages,
  createStudent,
  deleteStudent,
  getStudents,
} = require("../services/studentsService");

const getAllStudents = async (req, res) => {
  try {
    const searchValue = req.query.search ? req.query.search : "";
    const currentPage = req.query.currentPage ? req.query.currentPage : 1;
    const pageSize = req.query.pageSize ? req.query.pageSize : 5;
    const students = await getStudentsPages(
      searchValue,
      parseInt(currentPage),
      parseInt(pageSize)
    );
    res.json(students);
  } catch (err) {
    console.error(`Error in studentRoute ${err}`);
    res.status(500).json({ message: `Error al devolver datos ${err}` });
  }
};

const createNewStudent = async (req, res) => {
  try {
    const newStudent = await createStudent(req.body);
    res.json(newStudent);
  } catch (err) {
    res
      .status(404)
      .json({ message: `Ya existe un estudiante con ese email o dni` });
  }
};

const deleteNewStudent = async (req, res) => {
  try {
    const result = await deleteStudent(req.params.sid);
    if (result) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    res.status.json({ message: `Error al borrar ${err}` });
  }
};

const getAll = async (req, res) => {
  try {
    const students = await getStudents(req.user.id);
    res.json(students);
  } catch (err) {
    console.error(`Error in studentRoute ${err}`);
    res.status(500).json({ message: `Error al devolver datos ${err}` });
  }
}

module.exports = {
  getAllStudents,
  createNewStudent,
  deleteNewStudent,
  getAll
};

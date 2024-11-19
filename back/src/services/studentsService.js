StudentsRepository = require('../repository/studentsRepository');

const getStudents = async (id) => {
    try{
    const students = await StudentsRepository.getAll(id);
    return students;
    } catch(err) {
        console.error(`Error in studentsService ${err}`);
        throw err;
    }
};

const createStudent = async (student, idUser) => {
    try{
    const newStudent = await StudentsRepository.createNewStudent(student, idUser);
    return newStudent;
    } catch(err){
        console.error(`Error in studentsService ${err}`);
        throw err;
    }
};

const deleteStudent = async (sid, idUser) => {
    try {
        const result = await StudentsRepository.deleteBySid(sid, idUser);
        return result;
    } catch (err) {
        console.error(`Error in studentsService ${err}`);
        throw err;
    }
};

const getStudentsPages = async (search, currentPage, pageSize, idUser) => {
    try{
        return await StudentsRepository.getStudentsPagination(search, currentPage, pageSize, idUser);
    } catch(err){
        console.error(`Error in studentsService ${err}`);
        throw err;
    }
}


module.exports = {
    getStudents,
    createStudent,
    deleteStudent,
    getStudentsPages,

}
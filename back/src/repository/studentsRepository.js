const { Sequelize, Op } = require("sequelize");
const Students = require("../models/students");

const getAll = async (idUser) => {
  try {
    return await Students.findAll({
      where: {
        deleted: 0,
        user_id: idUser
      },
      attributes: {
        exclude: "createdAt, updateAt, deleted",
      },
    });
  } catch (err) {
    console.error(`Error in studentsRepository: ${err}`);
    throw err;
  }
};

const getById = async (id) => {
  try {
    return await Students.findByPk(id, {
      where: {
        deleted: 0,
      },
      attributes: {
        exclude: "deleted",
      },
    });
  } catch (err) {
    console.error(`Error in studentsRepository: ${err}`);
    throw err;
  }
};

const createNewStudent = async (student) => {
  try {
    const existsStudent = await Students.findOne({
      where: {
        [Sequelize.Op.or]: [{ email: student.email }, { dni: student.dni }],
      },
      deleted: 0
    });
    if (existsStudent) {
      throw new Error(`Ya existe un estudiante con ese email o dni`);
    }

    const lastStudent = await Students.findOne({
      where: { deleted: 0 },
      order: [["sid", "DESC"]],
    });

    const newSid = lastStudent ? lastStudent.sid + 1 : 1;
    student = {
      ...student,
      sid: newSid,
      createdAt: new Date(),
    };
    const newStudent = await Students.create(student);
    return newStudent;
  } catch (err) {
    console.error(`Error in studentsRepository: ${err}`);
    throw err;
  }
};

const deleteBySid = async (sid) => {
  try {
    return await Students.update(
      { deleted: 1 },
      {
        where: { sid: sid },
      }
    );
  } catch (err) {
    console.error(`Error in studentsRepository: ${err}`);
    throw err;
  }
};

const getStudentsPagination = async (search, currentPage, pageSize) => {
  try {
    const offset = (currentPage - 1) * pageSize;
    return await Students.findAndCountAll({
      where: {
        lastName: {
          [Op.startsWith]: search,
        },
        deleted: 0,
      },
      limit: pageSize,
      offset,
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
};


module.exports = {
  getAll,
  getById,
  createNewStudent,
  deleteBySid,
  getStudentsPagination,
};

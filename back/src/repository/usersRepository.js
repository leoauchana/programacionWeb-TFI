const Users = require("../models/users");
const bcrypt = require("bcrypt");

const createUser = async (user) => {
  try {
    const existingUser = await Users.findOne({
      where: { userName: user.userName },
    });
    if (existingUser) throw new Error(`El nombre de usuario ya existe`);
    const passwordHash = await bcrypt.hash(user.password, 10);
    const newUser = {
      name: user.name,
      lastName: user.lastName,
      userName: user.userName,
      password: passwordHash,
      createdAt: new Date(),
    };
    const userCreated = await Users.create(newUser);
    return {
      name: userCreated.name,
      lastName: userCreated.lastName,
      userName: userCreated.userName
    };
  } catch (err) {
    throw err;
  }
};

const authenticateUser = async (dataUser) => {
  try {
    const { userName, password } = dataUser;
    const userFound = await Users.findOne({
      where: {
        userName,
      },
    });
    if (!userFound) {
     throw new Error(`Usuario no existe`);
    }
    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) {
      throw new Error(`La contraseña es incorrecta`);
    }
    return userFound;
  } catch (err) {
    throw err;
  }
};

const getByIdUser = async (id) => {
  try{
    const userFound = Users.findByPk(id);
    if(!userFound) throw new Error(`Usuario no encontrado`);
    return userFound;
  }
    catch(err){
      throw new err;
    }
  }

module.exports = {
  createUser,
  authenticateUser,
  getByIdUser
};

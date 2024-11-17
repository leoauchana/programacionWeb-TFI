const UsersRepository = require('../repository/usersRepository');

const createUser = async (user) => {
    try{
        const newUser = await UsersRepository.createUser(user)
        return newUser;
    }catch(err){
        throw err;
    }
};

const validateUser = async (dataUser) => {
    try{
        const userFound = await UsersRepository.authenticateUser(dataUser);
        return userFound;
    }catch(err){
        throw err;
    }
}

const getById = async (id) => {
    try{
        const userFound = UsersRepository.getByIdUser(id);
        return userFound;
    }catch(err){
        throw err;
    }
};

module.exports = {
    createUser,
    validateUser,
    getById
}
const { Sequelize } = require("sequelize");

let seqInstance = null;

const createInstance = async () => {
  const instance = new Sequelize("mydatabase", "root", "ROOT", {
    host: "localhost",
    dialect: "mysql",
    pool: {
      max: 3,
    },
  });
  try {
    await instance.authenticate();
    console.log(`Connection has been established successfully`);
    return instance;
  } catch (err) {
    throw new Error(`Unable to connect to database`);
  }
};

const getInstance = async () => {
  if (!seqInstance) {
    seqInstance = await createInstance();
  }
    return seqInstance;
};

module.exports = {
  getInstance,
  createInstance,
};

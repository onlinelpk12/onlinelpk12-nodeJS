module.exports = {
    HOST: "onlinelpk12database.mysql.database.azure.com",
    USER: "AdminUser",
    PASSWORD: "online@123",
    DB: "onlinelpk12",
    dialect: "mysql",
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };

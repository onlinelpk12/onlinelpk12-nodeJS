module.exports = {
    HOST: "onlinelpk12data.mysql.database.azure.com",
    USER: "AdminUser@onlinelpk12data",
    PASSWORD: "onlinelpk12@",
    DB: "onlinelpk12",
    dialect: "mysql",
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };

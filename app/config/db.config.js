module.exports = {
    HOST: "onlinelpk12db.mysql.database.azure.com",
    USER: "AdminUser",
    PASSWORD: "online@lpk12",
    DB: "onlinelpk12ds",
    dialect: "mysql",
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };

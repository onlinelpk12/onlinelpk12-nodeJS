module.exports = {
    HOST: "onlinelpk12database.mysql.database.azure.com",
    USER: "onlinelpk12admin@onlinelpk12database",
    PASSWORD: "Paswd@1234",
    DB: "onlinelpk12",
    dialect: "mysql",
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
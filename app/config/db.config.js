module.exports = {
    HOST: "sql.freedb.tech",
    USER: "freedb_lpk12user",
    PASSWORD: "k$NZPQDEwFG39b%",
    DB: "freedb_onlinelpk12",
    dialect: "mysql",
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };

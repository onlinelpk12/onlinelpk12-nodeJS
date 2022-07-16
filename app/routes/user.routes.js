import cors from "cors"

const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(cors());

  app.use(function(req, res, next) {
    //res.header("Access-Control-Allow-Origin", "*")  //changes for CORS Issue
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    /*if (req.method === "OPTIONS") {
      res.header(
        "Access-Control-Allow-Methods",
        "POST, PUT, PATCH, GET, DELETE"
      )
      return res.status(200).json({})
    }*/
    next();
  });

  

  app.get("/api/test/all", controller.allAccess);

  app.get(
    "/api/test/student",
    [authJwt.verifyToken],
    controller.studentBoard
  );

  app.get(
    "/api/test/teacher",
    [authJwt.verifyToken, authJwt.isTeacher],
    controller.teacherBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};
const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
const cors = require('cors');

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Access-Control-Allow-Origin",
      "x-access-token, Origin, Content-Type, Accept"
    );
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
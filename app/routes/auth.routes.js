const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");
const multer = require('multer');
var upload = multer({ dest: 'lessonFiles/'});
var type = upload.single('file');





module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);

  app.post("/api/auth/uploadLesson", type, controller.uploadLesson);

  app.post("/api/auth/getLesson", controller.getLesson);

  app.post("/api/auth/lessonsList", controller.lessonsList);

  app.post("/api/auth/fetchAssessmentDetails", controller.fetchAssessmentDetails);

  app.post("/api/auth/uploadAssessmentDetails", controller.uploadAssessmentDetails);

};


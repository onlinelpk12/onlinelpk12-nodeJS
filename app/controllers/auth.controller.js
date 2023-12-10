const db = require("../models");
const config = require("../config/auth.config");

const User = db.user;
const Role = db.role;
const slideData = db.slide_data;
const assessmentData = db.assessment_data;

const multer = require("multer");
var upload = multer({ dest: 'lessonFiles/'});
var type = upload.single('file');


const fs = require('fs');
const base64 = require('base64-js');

const Op = db.Sequelize.Op;



var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    first_name:req.body.firstname,
    last_name:req.body.lastname,
    username: req.body.username,
    email_id: req.body.email,
    user_type:req.body.role,
    is_active: req.body.isactive,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({ 
                message: "User registered successfully!",
                userId: user.id
               });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({
             message: "User registered successfully!",
             userId: user.id
            });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};


exports.uploadLesson = (req, res) => {
  const pdfBuffer = fs.readFileSync(req.file.path, {encoding : "base64"});
  slideData.create({
      course_name: req.body.course_name,
      lesson_name: req.body.lesson_name,
      pdf: pdfBuffer, // Access file content from req.file.buffer
  })
  .then(data => {
      res.send({
          message: "Lesson saved successfully!"
      });
  })
  .catch(err => {
      res.status(500).send({ message: err.message });
  });
};


exports.getLesson = (req, res) => {
  slideData.findOne({
    where: {
      course_name: req.body.course_name,
      lesson_name: req.body.lesson_name
    }
  })
  .then(lessonData => {
     res.send({
      course_name: lessonData.course_name,
      lesson_name: lessonData.lesson_name,
      pdf: lessonData.pdf,
    });
  })
  .catch(err => {
      res.status(500).send({ message: err.message });
  });
};


exports.lessonsList = (req, res) => {
  slideData.findAll({
    attributes: ['lesson_name'],
    where: {
      course_name: req.body.course_name
    }
  })
  .then(lessonData => {
     res.send({
      lessons: lessonData
    });
  })
  .catch(err => {
      res.status(500).send({ message: err.message });
  });
};

exports.fetchAssessmentDetails = (req, res) => {
  assessmentData.findOne({
    where: {
      course_name: req.body.course_name,
      lesson_name: req.body.lesson_name
    }
  })
  .then(assessmentData => {
    if(assessmentData)
    {res.send({
      course_name: assessmentData.course_name,
      lesson_name: assessmentData.lesson_name,
      page_num: assessmentData.page_num,
      header: assessmentData.header,
      data: assessmentData.data,
      questions: assessmentData.questions,
      answers: assessmentData.answers,
    });
  }
  else
  {
    res.send({});
  }
  })
  .catch(err => {
      res.status(500).send({ message: err.message });
  });
};

exports.uploadAssessmentDetails = (req, res) => {
    assessmentData.create({
        course_name: req.body.course_name,
        lesson_name: req.body.lesson_name,
        page_num: req.body.page_num,
        header: req.body.header,
        data: req.body.data,
        questions: req.body.questions,
        answers: req.body.answers,
    })
    .then(data => {
        res.send({
            message: "assessment saved successfully!"
        });
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
};
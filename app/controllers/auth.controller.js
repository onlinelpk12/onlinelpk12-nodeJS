const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

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

exports.forgotPassword = (req, res) => {
  User.findOne({

    where: {

      email_id: req.body.email_id

    }

  }).then(user => {

    if (!user) {

      return res.status(404).send({ message: "User Not found." });

    }

    console.log(user);

    User.update({

      password: bcrypt.hashSync(req.body.password, 8)

    },

    {where: {

      email_id: req.body.email_id

    }}

    ).then(result => {

      console.log(result);

      res.send({

        message: "User password updated successfully!"

       });

    })

    

  })
};
const router = require('express').Router();
const { Login } = require("../models");
const db = require("../models");

// Defining methods for the SignupController
module.exports = {
  create: function(req, res) {
    var email = req.body[0].email;
    var password = req.body[0].password;
    var securityQuestion = req.body[0].securityQuestion;
    var securityAnswer = req.body[0].securityAnswer;
    var admin = req.body[0].admin;
    var firstName = req.body[0].firstName;
    var lastName = req.body[0].lastName;
    Login.findOne({ email: req.body[0].email}, (err, user) => {
      if(err) {
        console.log("signup.js post error: ", err)
      }
      else if (user) {
        res.json({
          error: 'Sorry, already a user with the email:'
        })
      } else {
        const newUser = new Login({
          email: email,
          password: password,
          securityQuestion: securityQuestion,
          securityAnswer: securityAnswer,
          admin: admin,
          firstName: firstName,
          lastName: lastName
        })
        newUser.save((err, savedUser) => {
          if(err) return res.json(err)
          res.json(savedUser);
        })
      }
    })
  },
};

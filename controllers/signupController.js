const router = require('express').Router();
const { Login } = require("../models");
const db = require("../models");

// Defining methods for the SignupController
module.exports = {
  create: function(req, res) {
    var email = req.body[0].email;
    var password = req.body[0].password;
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
          password: password
        })
        newUser.save((err, savedUser) => {
          if(err) return res.json(err)
          res.json(savedUser);
        })
      }
    })
  },
};

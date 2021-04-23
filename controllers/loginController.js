//const { Login } = require("../models");
const db = require("../models");

// Defining methods for the LoginController
module.exports = {
  findAll: function(req, res) {
    db.Login
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
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
  update: function(req, res) {
    db.Login
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  remove: function(req, res) {
    console.log("controller id = " + req.params.id);
    db.Login
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => {
        res.json(dbModel)})
      .catch(err => {
        console.log(err)
        res.status(422).json(err)
      }
      );
  }
};

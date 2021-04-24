const db = require("../models");
const { Login } = require("../models");
// Defining methods for the recipesController
module.exports = {
  findAll: function(req, res) {
    db.Recipes
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  create: function(req, res) {
    console.log("in create");
    var email = req.body[0].email;
    var password = req.body[0].password;
    var securityQuestion = req.body[0].securityQuestion;
    console.log(req.body[0]);
    console.log(req.body[0].securityQuestion);
    var securityAnswer = req.body[0].securityAnswer;
    var firstName = req.body[0].firstName;
    var lastName = req.body[0].lastName;
    var myID = req.body[0]._id;
//    Login.findOne({ _id: req.body[0]._id}, (err, user) => {
//      if(err) {
//        console.log("signup.js post error: ", err)
//      }
//      else if (user) {
//        res.json({
//          error: 'Sorry, already a user with the email:'
//        })
//      } else {
        const newUser = new Login({
          email: email,
          password: password,
          securityQuestion: securityQuestion,
          securityAnswer: securityAnswer,
          firstName: firstName,
          lastName: lastName,
          _id: req.body[0]._id
        })
        console.log("newUser = " + newUser)
        newUser.save((err, savedUser) => {
          if(err) return res.json(err)
          res.json(savedUser);
        })
//      }
//    })
  },
  // create: function(req, res) {
  //   db.Recipes
  //     .create(req.body)
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // },
  update: function(req, res) {
    db.Recipes
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    console.log("controller id = " + req.params.id);
    db.Recipes
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => {
        res.json(dbModel)})
      .catch(err => {
        console.log(err)
        res.status(422).json(err)
      }
      );
  },
};

const { Login } = require("../models");
const db = require("../models");
const bcrypt = require("bcryptjs");

// Defining methods for the reset password Controller
module.exports = {

  findOne: function(req, res) {
    db.Login
      .findOne({email: req.params.email})
      .then(dbModel => { console.log("findOne"), res.json(dbModel)})
      .catch(err => res.status(403).json(err));
  },

  create: function(req, res) {
    var email = req.body[0].email;
    var password = req.body[0].password;
    var securityQuestion = req.body[0].securityQuestion;
    var securityAnswer = req.body[0].securityAnswer;
    var firstName = req.body[0].firstName;
    var lastName = req.body[0].lastName;
    var myID = req.body[0]._id;

    const newUser = new Login({
      email: email,
      password: password,
      securityQuestion: securityQuestion,
      securityAnswer: securityAnswer,
      firstName: firstName,
      lastName: lastName,
      _id: myID
    })
    newUser.save((err, savedUser) => {
      if(err) return res.json(err)
        res.json(savedUser);
    })
  },

  update: function(req, res) {
    var passwordChange = req.body.password;
    db.Login
      .findOne({email: req.params.email})
      .then(dbModel => { console.log("findOne");
        var newPassword = bcrypt.hashSync(passwordChange, 10);
        db.Login.findOneAndUpdate({_id: dbModel._id}, {password: newPassword}, {new: true})
          .then(result => {
              res.json(result);
          })
          .catch(err => console.log(err));
       })
  },

};

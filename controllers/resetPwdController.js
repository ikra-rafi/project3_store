const { Login } = require("../models");
const db = require("../models");

// Defining methods for the LoginController
module.exports = {

  findOne: function(req, res) {
    console.log(req.body);
    console.log(req.user);
    console.log(req.data);
    console.log(req.params);
    db.Login
      .findOne({email: req.params.email})
      .then(dbModel => { console.log("findOne"), res.json(dbModel)})
      .catch(err => res.status(403).json(err));
  },

  // update: function(req, res, next) {
  //   console.log(req.params.email);
  //   console.log(req.body)
  //   db.Login
  //     .findOneAndUpdate({ email: req.params.email }, req.body)
  //     .then(dbModel => {console.log("inside update reset"); console.log(dbModel); res.json(dbModel)})
  //     .catch(err => res.status(422).json(err));
  // },

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

        const newUser = new Login({
          email: email,
          password: password,
          securityQuestion: securityQuestion,
          securityAnswer: securityAnswer,
          firstName: firstName,
          lastName: lastName,
          _id: myID
        })
        console.log("newUser = " + newUser)
        newUser.save((err, savedUser) => {
          if(err) return res.json(err)
          res.json(savedUser);
        })

  },

  update: function(req, res) {

    console.log(req.body);
    console.log(req.params.email);
    var password = req.body.password;
    console.log(req.body.password);
    db.Login
      .findOne({email: req.params.email})
      .then(dbModel => { console.log("findOne"), 
        console.log(dbModel);

        console.log(dbModel._id);
       const newUser = new Login({
//         email: email,
          firstName: "Kyle",
//        firstName: "Joe",
//         password: password,
//         securityQuestion: securityQuestion,
//         securityAnswer: securityAnswer,
//         firstName: firstName,
//         lastName: lastName
       })
      console.log(newUser);
      //  newUser.updateOne({ firstName: "Betty"}, (err, savedUser) => {
      //    console.log(savedUser);
      //    if(err) return res.json(err)
      //    res.json(savedUser);
      //  });

       Login.updateOne({email: dbModel.email}, {$set: {password: password}}, (err, user) => {
         if(err) console.log(res.json(err));
 //        res.json(user);
       })

//       save({_id: dbModel._id, firstName: "Peter", password: password}, (err, savedUser) => {
//         console.log("json saveduser = " + JSON.stringify(savedUser));
//         if(err) return res.json(err)
//         res.json(savedUser);
//       })
//      }
    })
  },

};

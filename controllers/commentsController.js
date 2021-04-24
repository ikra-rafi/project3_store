const db = require("../models");

// Defining methods for the commentsController
module.exports = {
  findAll: function(req, res) {
    console.log('in findall')
    db.Comments
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    var id = req.params.id;
    console.log("id=" + id);
    db.Comments
      .create(req.body)
      .then(dbModel => {
        db.Login.findOneAndUpdate({ _id: req.params.id}, {$push: { comments: dbModel._id}}, {new: true})
          .then(results => {console.log(results); res.json(results)})
          .catch(err => res.status(422).json(err));
      })
      .catch(err => res.status(422).json(err))
  },
  update: function(req, res) {
    console.log("update")
    db.Comments
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    console.log("controller id = " + req.params.id);
    db.Comments
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

  findOne: function(req, res) {
    console.log("in acct");
    console.log(req.query.email);
    db.Login
      .findOne({email: req.query.email})
      .then(dbModel => {console.log(dbModel); res.json(dbModel)})
      .catch(err => console.log(err));
  }


};

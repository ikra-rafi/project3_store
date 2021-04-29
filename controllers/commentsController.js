const db = require("../models");

// Defining methods for the commentsController
module.exports = {
  findAll: function(req, res) {
    db.Comments
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    var id = req.params.id;
    db.Comments
      .create(req.body)
      .then(dbModel => {
        db.Login.findOneAndUpdate({ _id: id}, {$push: { commentIDs: dbModel._id}}, {new: true})
          .then(results => {res.json(results)})
          .catch(err => res.status(422).json(err));
      })
      .catch(err => res.status(422).json(err))
  },
  update: function(req, res) {
    db.Comments
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
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
    db.Login
      .findOne({email: req.body.email})
      .then(dbModel => {res.json(dbModel)})
      .catch(err => console.log(err));
  }


};

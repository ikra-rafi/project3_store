const db = require("../models");

// Defining methods for the ordersController
module.exports = {
  findAll: function(req, res) {
    db.Login
      .find({_id: req.user._id})
      .populate("orderIDs")
      .then(dbModel => {console.log(dbModel); res.json(dbModel)})
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    var id = req.params.id;
    if(req.params.acct==="acctfalse") {
      db.Orders
        .create(req.body)
        .then(dbModel => {
          res.json(dbModel);
        })
        .catch(err => console.log(err));
    } else {
      db.Orders
        .create(req.body)
        .then(dbModel => {
          db.Login.findOneAndUpdate({_id: id}, {$push: {orderIDs: dbModel._id}}, {new: true})
            .then(results => {res.json(results)})
            .catch(err => {console.log("update login failed"); res.status(422).json(err)})
        })
        .catch(err => console.log(err));
    }
  },
  update: function(req, res) {
    db.Orders
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Orders
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

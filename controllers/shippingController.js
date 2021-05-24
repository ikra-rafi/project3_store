const db = require("../models");

// Defining methods for the shipping Controller
module.exports = {
  findOne: function(req, res) {
    console.log("req.params.maxWeight = " + req.params.maxWeight);
    db.Shipping
      .findOne({maxWeight: { $gte: req.params.maxWeight}})
      .then(dbModel => {console.log("findOne"), res.json(dbModel)})
      .catch(err => res.status(403).json(err));
  },
  findAll: function(req, res) {
    db.Shipping
      .find(req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Shipping
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Shipping
      .findOneAndUpdate({ _id: req.params.id }, {shipCost: req.body.shipCost})
      .then(dbModel => {res.json(dbModel);})
      .catch(err => res.status(422).json(err));
  },
  removeItem: function(req, res) {
    db.Shipping
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
  remove: function(req, res) {
    db.Shipping
      .remove()
      .then(dbModel => {
        res.json(dbModel)})
      .catch(err => {
        console.log(err)
        res.status(422).json(err)
      }
      );
  },
};

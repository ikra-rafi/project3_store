const db = require("../models");

// Defining methods for the sales tax Controller
module.exports = {
  findOne: function(req, res) {
    console.log("req.params.state = " + req.params.state);
    db.SalesTax
      .findOne({state: req.params.state})
      .then(dbModel => { console.log("findOne"), res.json(dbModel)})
      .catch(err => res.status(403).json(err));
  },
  create: function(req, res) {
    db.SalesTax
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    console.log("state id" + req.params.state);
    console.log("sales tax" + req.body.salestax);
    db.SalesTax
      .findOneAndUpdate({ state: req.params.state }, {salesTax: req.body.salestax})
      .then(dbModel => {res.json(dbModel);})
      .catch(err => res.status(422).json(err));
  },
  removeItem: function(req, res) {
    db.SalesTax
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
    db.SalesTax
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

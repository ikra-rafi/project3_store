const db = require("../models");

// Defining methods for the shoppingCartController
module.exports = {
  findAll: function(req, res) {
    db.ShoppingCart
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.ShoppingCart
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.ShoppingCart
      .findOneAndUpdate({ _id: req.params.id }, req.body, {new: true})
      .then(dbModel => {res.json(dbModel); console.log(dbModel)})
      .catch(err => res.status(422).json(err));
  },
  removeItem: function(req, res) {
    console.log("controller id = " + req.params.id);
    db.ShoppingCart
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
    console.log("remove all cart items")
    db.ShoppingCart
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

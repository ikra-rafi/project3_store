const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shoppingcartSchema = new Schema({
  title: { type: String},
  author: { type: String},
  synopsis: { type: String},
  image: {type: String},
  link: {type: String},
});

const ShoppingCart = mongoose.model("ShoppingCart", shoppingcartSchema);

module.exports = ShoppingCart;

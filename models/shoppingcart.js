const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shoppingcartSchema = new Schema(
  [
  { name: { type: String },
    productID: { type: String },
    prodInfo: {
      size: { type: String },
      price: { type: Number },
      quantity: { type: Number }
    }
}
]);

const ShoppingCart = mongoose.model("ShoppingCart", shoppingcartSchema);

module.exports = ShoppingCart;

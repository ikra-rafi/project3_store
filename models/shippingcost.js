const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shippingCostSchema = new Schema([
  {
    minWeight: { type: Number },
    maxWeight: { type: Number },
    shipCost: {type: Number}
  }
]);

const Shipping = mongoose.model("ShipCost", shippingCostSchema);

module.exports = Shipping;

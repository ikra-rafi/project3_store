const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const salestaxSchema = new Schema([
  {
    state: { type: String },
    salesTax: { type: Number }
  }
]);

const SalesTax = mongoose.model("SalesTax", salestaxSchema);

module.exports = SalesTax;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productsSchema = new Schema([
  { name: { type: String },
    description: { type: String },
    packaging: [{
          size: { type: String },
          price: { type: String },
          quantity: { type: Number }
    }],
    healthBenefit: { type: String },
    picLink: { type: String },
    historyDetails: { type: String },
    family: {
        baking: { type: Boolean },
        grilling: { type: Boolean },
        seasoning: { type: Boolean },
        extracts: { type: Boolean },
        teas: { type: Boolean }   
    },
    region: {
        india: { type: Boolean },
        asia: { type: Boolean },
        carribean: { type: Boolean },
        middleEast: { type: Boolean },
        african: { type: Boolean },
        latinAmerica: { type: Boolean },
        europe: { type: Boolean }
    },
    productID: { type: String },
    ratings: [
      { stars: { type: Number }}
    ]
  }]
);

const Products = mongoose.model("Products", productsSchema);

module.exports = Products;

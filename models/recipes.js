const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipesSchema = new Schema(
  [{
    recipeDesc: { type: String },
    recipeIngredients: { type: String },
    recipeSteps: { type: String },
    productID: { type: String}
  }]
);

const Recipes = mongoose.model("Recipes", recipesSchema);

module.exports = Recipes;

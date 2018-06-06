const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  name: String,
  alias: String,
  category: String,
  description: String,
  where: String,
  nutrition: String,
});

const Ingredient = mongoose.model('Ingredient', ingredientSchema);
module.exports = Ingredient;

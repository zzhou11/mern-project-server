const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema for recipe
const RecipeSchema = new Schema({
    name: {
        type: String,
        required: [true, 'The name text field is required'],
    },
    description: {
        type: String
    }
});

// Create model for recipe
const RecipeModel = mongoose.model('recipe', RecipeSchema);

module.exports.Recipe = RecipeModel;

module.exports.getAllRecipes = async () => {
    return RecipeModel.find({})
}

module.exports.insertRecipe = async (newRecipe) => {
    return RecipeModel.create(newRecipe)
}

module.exports.deleteRecipeById = async (id) => {
    return RecipeModel.findOneAndDelete({ _id: id })
}

module.exports.deleteRecipeByName = async (recipeName) => {
    return RecipeModel.findOneAndDelete({name: recipeName})
}
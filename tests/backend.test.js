const { TestWatcher } = require('jest');
const mongoose = require('mongoose');
const Recipe = require("../models/recipes")
require('dotenv').config();


beforeAll(async () => {
    // Connect to the database
   await mongoose
        .connect(process.env.DB, {
            useNewUrlParser: true, // Fall back to old MongoDB connection string parser
            useUnifiedTopology: true // Opts in to MongoDB's new connection management engine
        })
        .then(() => console.log('Database connected successfully for testing'))
        .catch((err) => console.log(err));
    // Since mongoose's Promise is deprecated, we override it with Node's Promise
    await Recipe.insertRecipe({name: "Test Recipe", description: ""})
    mongoose.Promise = global.Promise;
})

test("Add a recipe POST /recipes", async () => {
    const newRecipe = {
        name: "My New Recipe!",
        description: "some ingredient 1, some ingredient 2"
    }
    const recipe = await Recipe.insertRecipe(newRecipe)
    expect(recipe.name).toBe("My New Recipe!")
    expect(recipe.description).toBe("some ingredient 1, some ingredient 2")
})

test("Delete a recipe by id DELETE /recipes", async () => {
    let id = "507f1f77bcf86cd799439011"
    const newRecipe = {
        _id: id,
        name: "Another recipe",
        description: ""
    }
    await Recipe.insertRecipe(newRecipe)
    const res = await Recipe.deleteRecipeById(id)
    expect(res.name).toBe("Another recipe")
    expect(res.description).toBe("")
    expect(res._id.toString()).toBe(id)
})

test("Delete a recipe by name DELETE /recipes", async () => {
    const newRecipe = {
        name: "Another recipe 2",
        description: ""
    }
    await Recipe.insertRecipe(newRecipe)
    const res = await Recipe.deleteRecipeByName("Another recipe 2")
    expect(res.name).toBe("Another recipe 2")
    expect(res.description).toBe("")
})

test("Get all recipes GET /recipes", async () => {
    const res = await Recipe.getAllRecipes()
    expect(res.length).toBeGreaterThan(0)
})

afterAll(async () => {
    await Recipe.deleteRecipeByName("My New Recipe!")
    await Recipe.deleteRecipeByName("Test Recipe")
    await mongoose.disconnect();
})


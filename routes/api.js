const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipes');

router.get('/recipes', (req, res, next) => {
    // Return all the data
    Recipe.getAllRecipes()
        .then((data) => res.json(data))
        .catch(next);
});

router.post('/recipes', (req, res, next) => {
    if (req.body.name) {
        Recipe.insertRecipe(req.body)
            .then((data) => res.json(data))
            .catch(next);
    } else {
        res.json({
            error: 'The input field is empty, body is ' + JSON.stringify(req.body),
        });
    }
});

router.delete('/recipes/:id', (req, res, next) => {
    Recipe.deleteRecipeById(req.params.id)
        .then((data) => res.json(data))
        .catch(next);
});

module.exports = router;

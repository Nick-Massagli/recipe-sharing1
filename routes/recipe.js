const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipe');
router.get('/', recipeController.getAll);
router.get('/:id', recipeController.getSingle);
router.post('/', recipeController.createRecipe);
router.put('/:id', recipeController.updateRecipe);
router.delete('/:id', recipeController.deleteRecipe);
module.exports = router;

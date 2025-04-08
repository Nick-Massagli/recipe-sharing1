const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipe');
const { requiresAuth } = require("express-openid-connect");
const validator = require("../Utilities/valdiation");

router.get('/', recipeController.getAll);
router.get('/:id', recipeController.getSingle);
router.post('/', validator.recipe, /*requiresAuth(),*/ recipeController.createRecipe);
router.put('/:id',validator.recipe,/* requiresAuth(),*/ recipeController.updateRecipe);
router.delete('/:id', recipeController.deleteRecipe);
module.exports = router;

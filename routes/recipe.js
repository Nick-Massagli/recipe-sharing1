const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipe');
const { requiresAuth } = require("express-openid-connect");

router.get('/', recipeController.getAll);
router.get('/:id', recipeController.getSingle);
router.post('/', /*requiresAuth(),*/ recipeController.createRecipe);
router.put('/:id',/* requiresAuth(),*/ recipeController.updateRecipe);
router.delete('/:id', recipeController.deleteRecipe);
module.exports = router;

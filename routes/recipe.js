const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipe');
const { requiresAuth } = require('express-openid-connect');
const validator = require('../Utilities/valdiation');

router.get('/', async (req, res, next) => {
  try {
    await recipeController.getAll(req, res);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    await recipeController.getSingle(req, res);
  } catch (error) {
    next(error);
  }
});

router.post(
  '/',
  validator.recipe,
  /*requiresAuth(),*/ async (req, res, next) => {
    try {
      await recipeController.createRecipe(req, res);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/:id',
  validator.recipe,
  /*requiresAuth(),*/ async (req, res, next) => {
    try {
      await recipeController.updateRecipe(req, res);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  /*requiresAuth(),*/ async (req, res, next) => {
    try {
      await recipeController.deleteRecipe(req, res);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;

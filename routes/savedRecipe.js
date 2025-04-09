const express = require('express');
const router = express.Router();
const savesController = require('../controllers/savedRecipe');
const { requiresAuth } = require('express-openid-connect');
const validator = require('../Utilities/valdiation');

router.get('/', async (req, res, next) => {
  try {
    await savesController.getAll(req, res);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    await savesController.getSingle(req, res);
  } catch (error) {
    next(error);
  }
});

router.post('/',requiresAuth(), validator.saveRecipe, async (req, res, next) => {
  try {
    await savesController.createRecipe(req, res);
  } catch (error) {
    next(error);
  }
});

//router.put('/:id', requiresAuth(), async (req, res, next) => {
//  try {
//    await savesController.updateRecipe(req, res);
//  } catch (error) {
//    next(error);
//  }
//});

router.delete('/:id', requiresAuth(), async (req, res, next) => {
  try {
    await savesController.deleteRecipe(req, res);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

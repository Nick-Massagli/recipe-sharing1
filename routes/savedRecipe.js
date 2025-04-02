const express = require("express");
const router = express.Router();
const savesController = require("../controllers/savedRecipe");
router.get('/', savesController.getAll);
router.get('/:id', savesController.getSingle);
router.post('/', savesController.createRecipe);
//router.put('/:id', savesController.updateRecipe);
router.delete('/:id', savesController.deleteRecipe);
module.exports = router;

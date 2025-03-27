const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/commentsController');

// Get all comments for a recipe
router.get('/:recipeId', commentsController.getComments);

// Add a new comment
router.post('/:recipeId', commentsController.addComment);

// Delete a comment
router.delete('/:recipeId/:commentId', commentsController.deleteComment);

module.exports = router;

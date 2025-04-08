const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/comments');
const validator = require('../Utilities/valdiation');
const { requiresAuth } = require('express-openid-connect');

// Get all comments for a recipe
router.get('/:recipeId', validator.getComments, commentsController.getComments);

// Add a new comment
router.post('/:recipeId', validator.saveComment,/* requiresAuth(),*/commentsController.addComment);

// Delete a comment
router.delete('/:recipeId/:commentId',validator.deleteComment,/* requiresAuth(),*/ commentsController.deleteComment);

module.exports = router;

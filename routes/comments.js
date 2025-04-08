const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/comments');
const validator = require('../Utilities/valdiation');
const { requiresAuth } = require('express-openid-connect');

// Get all comments for a recipe
router.get('/:recipeId', validator.getComments, (req, res, next) => {
  commentsController.getComments(req, res, next);
});

// Add a new comment
router.post(
  '/:recipeId',
  validator.saveComment,
  /* requiresAuth(), */ (req, res, next) => {
    commentsController.addComment(req, res, next);
  }
);

// Delete a comment
router.delete(
  '/:recipeId/:commentId',
  validator.deleteComment,
  /* requiresAuth(), */ (req, res, next) => {
    commentsController.deleteComment(req, res, next);
  }
);

module.exports = router;

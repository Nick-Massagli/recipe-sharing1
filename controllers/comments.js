const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');

const getComments = async (req, res, next) => {
  try {
    const recipeId = req.params.recipeId;
    const comments = await mongodb
      .getDb()
      .db()
      .collection('comments')
      .find({ recipeId: recipeId })
      .toArray();
    res.status(200).json(comments);
  } catch (err) {
    next(err);
  }
};

const addComment = async (req, res, next) => {
  try {
    const recipeId = req.params.recipeId;
    const user = await mongodb
      .getDb()
      .db()
      .collection('users')
      .findOne({ _id: new ObjectId(req.body.user) });
    if (!user) {
      const error = new Error('User not found');
      error.status = 404;
      throw error;
    }
    const comment = {
      recipeId: recipeId,
      userId: {
        id: user._id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      text: req.body.text,
      createdAt: new Date(),
    };
    const result = await mongodb
      .getDb()
      .db()
      .collection('comments')
      .insertOne(comment);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const commentId = req.params.commentId;
    const result = await mongodb
      .getDb()
      .db()
      .collection('comments')
      .deleteOne({ _id: new ObjectId(commentId) });
    if (result.deletedCount === 0) {
      const error = new Error('Comment not found');
      error.status = 404;
      throw error;
    }
    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getComments,
  addComment,
  deleteComment,
};

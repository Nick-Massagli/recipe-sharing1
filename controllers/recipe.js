const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  try {
    const result = await mongodb.getDb().db().collection('recipe').find();
    const lists = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  } catch (error) {
    next(error); // Pass error to the error handler
  }
};

const getSingle = async (req, res, next) => {
  try {
    const recipeId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection('recipe')
      .findOne({ _id: recipeId });

    if (!result) {
      const error = new Error('Recipe not found');
      error.status = 404;
      throw error;
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};


const createRecipe = async (req, res, next) => {

  try {
    const user = await mongodb
      .getDb()
      .db()
      .collection('users')
      .findOne({ _id: new ObjectId(req.body.AuthorID) });

    if (!user) {
      const error = new Error('User not found');
      error.status = 404;
      throw error;
    }

    const type = {
      AuthorID: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      title: req.body.title,
      ingredients: req.body.ingredients,
      directions: req.body.directions,
      prepTime: req.body.prepTime,
      createdTimestamp: req.body.createdTimestamp || new Date(),
      serves: req.body.serves,
    };


    const response = await mongodb
      .getDb()
      .db()
      .collection('recipe')
      .insertOne(type);

    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      const error = new Error('Failed to create recipe');
      error.status = 500;
      throw error;
    }
  } catch (error) {
    next(error);

  }
};

const updateRecipe = async (req, res, next) => {
  try {
    const recipeId = new ObjectId(req.params.id);
    const type = {
      title: req.body.title,
      ingredients: req.body.ingredients,
      directions: req.body.directions,
      prepTime: req.body.prepTime,
      AuthorID: req.body.AuthorID,
      createdTimestamp: req.body.createdTimestamp,
      serves: req.body.serves,
    };

    const response = await mongodb
      .getDb()
      .db()
      .collection('recipe')
      .replaceOne({ _id: recipeId }, type);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      const error = new Error('Failed to update recipe');
      error.status = 500;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

const deleteRecipe = async (req, res, next) => {
  try {
    const recipeId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db()
      .collection('recipe')
      .deleteOne({ _id: recipeId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      const error = new Error('Failed to delete recipe');
      error.status = 500;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getSingle,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};

const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDb().db().collection('recipe').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res) => {
  const recipeId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('recipe').find({ _id: recipeId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createRecipe = async (req, res) => {
  try {
    // Fetch the user from the users collection
    const user = await mongodb.getDb().db().collection('users').findOne({ _id: new ObjectId(req.body.AuthorID) });

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
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

    const response = await mongodb.getDb().db().collection('recipe').insertOne(type);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the recipe.');
  }
}catch (error) {
  res.status(500).json({ error: 'An unexpected error occurred.' });
}
};

const updateRecipe = async (req, res) => {
  const recipeId = new ObjectId(req.params.id);
  const type = {
    title: req.body.title,
    ingredients: req.body.ingredients,
    directions: req.body.directions,
    prepTime: req.body.prepTime,
    AuthorID: req.body.AuthorID,
    createdTimestamp: req.body.createdTimestamp,
    serves: req.body.serves
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('recipe')
    .replaceOne({ _id: recipeId }, type);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the recipe.');
  }
};

const deleteRecipe = async (req, res) => {
  const recipeId = new ObjectId(req.params.id);
  const response = await mongodb
  .getDb()
  .db()
  .collection('recipe')
  .deleteOne({ _id: recipeId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the recipe.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createRecipe,
  updateRecipe,
  deleteRecipe 
};
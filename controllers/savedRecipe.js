const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

// Get a list of all saved recipes
exports.getAll = async (req, res, next) => {
  try {
    const savedRecipe = await mongodb
      .getDb()
      .db()
      .collection("savedRecipe")
      .find()
      .toArray();
    res.json(savedRecipe);
  } catch (error) {
    next(error); // Pass error to the error handler
  }
};

// Get a saved recipe by ID
exports.getSingle = async (req, res, next) => {
  try {
    const savedRecipe = await mongodb
      .getDb()
      .db()
      .collection("savedRecipe")
      .findOne({ _id: new ObjectId(req.params.id) });

    if (!savedRecipe) {
      const error = new Error("Saved recipe not found");
      error.status = 404;
      throw error;
    }

    res.json(savedRecipe);
  } catch (error) {
    next(error);
  }
};

// Create a new saved recipe with aggregation of recipe and user
exports.createRecipe = async (req, res, next) => {
  try {
    const recipe = await mongodb
      .getDb()
      .db()
      .collection("recipe")
      .findOne({ _id: new ObjectId(req.body.recipeId) });
    const user = await mongodb
      .getDb()
      .db()
      .collection("users")
      .findOne({ _id: new ObjectId(req.body.userId) });

    if (!recipe || !user) {
      const error = new Error("Recipe or User not found");
      error.status = 404;
      throw error;
    }

    const savedRecipe = {
      recipe: {
        id: recipe._id,
        title: recipe.title,
        directions: recipe.directions,
        ingredients: recipe.ingredients,
        prepTime: recipe.prepTime,
        servings: recipe.serves,
      },
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      savedTimestamp: new Date(),
    };

    const response = await mongodb
      .getDb()
      .db()
      .collection("savedRecipe")
      .insertOne(savedRecipe);

    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      const error = new Error("Failed to save the recipe");
      error.status = 500;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

// Delete a saved recipe
exports.deleteRecipe = async (req, res, next) => {
  try {
    const response = await mongodb
      .getDb()
      .db()
      .collection("savedRecipe")
      .deleteOne({ _id: new ObjectId(req.params.id) });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      const error = new Error("Failed to delete saved recipe");
      error.status = 500;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

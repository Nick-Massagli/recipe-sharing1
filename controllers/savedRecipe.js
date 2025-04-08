const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

//get alist of all saved recipes
exports.getAll = async (req, res) => {
   // const db = mongodb.getDB();
    const savedRecipe = await mongodb.getDb().db().collection('savedRecipe').find().toArray();
    res.json(savedRecipe);
};
//get by id
exports.getSingle = async (req, res) => {
    //const db = mongodb.getDb();
    const savedRecipe = await mongodb.getDb().db().collection('savedRecipe').findOne({ _id: new ObjectId(req.params.id) });
    res.json(savedRecipe);
};
//create a new saved recipe with aggregation with recipe and user
exports.createRecipe = async (req, res) => {
    try {
        // Fetch the recipe and user from their respective collections
        const recipe = await mongodb.getDb().db().collection('recipe').findOne({ _id: new ObjectId(req.body.recipeId) });
        const user = await mongodb.getDb().db().collection('users').findOne({ _id: new ObjectId(req.body.userId) });

        // Check if both recipe and user exist
        if (!recipe || !user) {
            return res.status(404).json({ error: 'Recipe or User not found' });
        }

        // Create the saved recipe object with populated recipe and user details
        const savedRecipe = {
            recipe: {
                id: recipe._id,
                title: recipe.title,
                directions: recipe.directions,
                ingredients: recipe.ingredients,
                prepTime: recipe.prepTime,
                servings: recipe.serves
            },
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            },
            savedTimestamp: new Date()
        };

         // Insert the saved recipe into the collection
         const response = await mongodb.getDb().db().collection('savedRecipe').insertOne(savedRecipe);

         if (response.acknowledged) {
             res.status(201).json(response);
         } else {
             res.status(500).json({ error: 'Failed to save the recipe' });
         }
     } catch (error) {
         res.status(500).json({ error: error.message });
     }
 };



//delete a saved recipe
exports.deleteRecipe = async (req, res) => {
    const db = mongodb.getDb().db();
    await db.collection('savedRecipe').deleteOne({ _id: new ObjectId(req.params.id) });
    res.status(204).send();
};
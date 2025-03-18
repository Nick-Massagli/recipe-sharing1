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
    const db = mongodb.getDB();
    const savedRecipe = await db.collection('savedRecipe').findOne({ _id: ObjectId(req.params.id) });
    res.json(savedRecipe);
};
//create a new saved recipe with aggregation with recipe and user
exports.createRecipe = async (req, res) => {
   // const db = mongodb.getDB();
   const recipeId = new ObjectId(req.params.id);
    const userId = new ObjectId(req.params.id);
    const recipe = await mongodb.getDb().db().collection('recipe').findOne({ _id: new ObjectId(req.params.recipeId) });
    const user = await mongodb.getDb().db().collection('users').findOne({ _id:new ObjectId(req.params.userId) });
    const savedRecipe = {
        recipe: recipeId,
        user: userId,
        savedTimestamp: new Date()
    };
    const response = await mongodb.getDb().db().collection('savedRecipe').insertOne(savedRecipe);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the saved recipe.');
    }
};


//delete a saved recipe
exports.deleteRecipe = async (req, res) => {
    const db = mongodb.getDB();
    await db.collection('savedRecipe').deleteOne({ _id: ObjectId(req.params.id) });
    res.status(204).send();
};
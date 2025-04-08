const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');

const getComments = async (req, res) => {
    try {
        const recipeId = req.params.recipeId;
        const db = mongodb.getDb();
        const comments = await mongodb.getDb().db().collection('comments').find({ recipeId: recipeId }).toArray();
        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const addComment = async (req, res) => {
    try {
        const recipeId = req.params.recipeId;
        // Fetch the user from the users collection
        const user = await mongodb.getDb().db().collection('users').findOne({ _id: new ObjectId(req.body.user) });
       console.log(user)
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const comment = {
            recipeId: recipeId,
            userId:{
                id: user._id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
            },
            //user: req.body.user,
            text: req.body.text,
            createdAt: new Date()
        };
        console.log(req.body)
        //const db = mongodb.getDb();
        const result = await mongodb.getDb().db().collection('comments').insertOne(comment);
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteComment = async (req, res) => {
    try {
        const commentId = req.params.commentId;
        const db = mongodb.getDb();
        const result = await db.collection('comments').deleteOne({ _id: new ObjectId(commentId) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getComments,
    addComment,
    deleteComment
};
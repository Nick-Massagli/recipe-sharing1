const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getAllUsers = async (req, res) => {
  const result = await mongodb.getDb().db().collection("users").find();
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists);
  });
};

const getUserById = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection("users")
    .find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists[0]);
  });
};

const createUser = async (req, res) => {
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    username: req.body.username,
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection("users")
    .insertOne(user);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while creating the user.");
  }
};

const updateUser = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const existingUser = await mongodb
    .getDb()
    .db()
    .collection("users")
    .findOne({ _id: userId });

  if (!existingUser) {
    return res.status(404).json({ error: "User not found" });
  }

  const updatedUser = {
    firstName: req.body.firstName || existingUser.firstName,
    lastName: req.body.lastName || existingUser.lastName,
    email: req.body.email || existingUser.email,
    username: req.body.username || existingUser.username,
  };

  const response = await mongodb
    .getDb()
    .db()
    .collection("users")
    .updateOne({ _id: userId }, { $set: updatedUser });

  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while updating the user.");
  }
};

const deleteUser = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db()
    .collection("users")
    .deleteOne({ _id: userId }, true);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while deleting the user.");
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};

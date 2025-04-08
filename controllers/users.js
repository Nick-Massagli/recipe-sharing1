const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getAllUsers = async (req, res, next) => {
  try {
    const result = await mongodb.getDb().db().collection("users").find();
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists);
    });
  } catch (error) {
    next(error); // Pass error to the error handler
  }
};

const getUserById = async (req, res, next) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection("users")
      .find({ _id: userId });
    result.toArray().then((lists) => {
      if (lists.length > 0) {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(lists[0]);
      } else {
        const error = new Error("User not found");
        error.status = 404;
        throw error; // Throw error to be caught by the error handler
      }
    });
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
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
      res
        .status(201)
        .json({
          message: "User created successfully",
          id: response.insertedId,
        });
    } else {
      const error = new Error("Failed to create user");
      error.status = 500;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const userId = new ObjectId(req.params.id);
    const existingUser = await mongodb
      .getDb()
      .db()
      .collection("users")
      .findOne({ _id: userId });

    if (!existingUser) {
      const error = new Error("User not found");
      error.status = 404;
      throw error;
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
      res.status(200).json({ message: "User updated successfully" });
    } else {
      const error = new Error("Failed to update user");
      error.status = 500;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db()
      .collection("users")
      .deleteOne({ _id: userId }, true);
    if (response.deletedCount > 0) {
      res.status(204).json({ message: "User deleted successfully" });
    } else {
      const error = new Error("Failed to delete user");
      error.status = 500;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};

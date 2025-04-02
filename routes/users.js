const express = require("express");
const router = express.Router();
const userController = require("../controllers/users");
const { requiresAuth } = require("express-openid-connect");
// Get all users
router.get("/", userController.getAllUsers);

// Get single user by ID
router.get("/:id", userController.getUserById);

// Create a new user
router.post("/", requiresAuth(), userController.createUser);

// Update a user by ID
router.put("/:id", requiresAuth(), userController.updateUser);

// Delete a user by ID
router.delete("/:id", requiresAuth(), userController.deleteUser);

module.exports = router;

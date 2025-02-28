const express = require("express");

//Import controllers
const { createUser, loginUser, getUsers } = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

// Define routes
router.post("/register", authMiddleware, createUser);
router.post("/login", loginUser);
router.get("/users", authMiddleware, getUsers);
router.put("/update-role", authMiddleware, updateUserRole);

module.exports = router;
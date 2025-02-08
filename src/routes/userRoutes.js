const express = require("express");
const { createUser, getUsers } = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", createUser);
router.get("/", authMiddleware, getUsers);

module.exports = router;
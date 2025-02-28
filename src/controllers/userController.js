const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");

const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validate if role is valid
    if (role && role !== "admin" && role !== "user") {
      return res.status(400).json({ message: "Invalid role" });
    }

    //If user is not admin, cannot create new users
    const isAdmin = req.user?.role === "admin";
    const newRole = isAdmin && role === "admin" ? "admin" : "user";

    const newUser = await User.create({ name, email, password });
    res.json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const getUsers = async (req, res) => {
  try {
    if (req.user?.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(404).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role }, 
      process.env.JWT_SECRET,
       { expiresIn: "1h" }
      );

      res.json({ token, role: user.role });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
};

const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (req.user?.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    if (role !== "admin" && role !== "user") {
      return res.status(400).json({ message: "Invalid role" });
    }

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (req.user.id === user.id) {
      return res.status(400).json({ message: "You cannot change your own role" });
    }

    user.role = role;
    await user.save();

    res.json( { message: "Role updated" }, user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = { createUser, getUsers, login, updateUserRole };
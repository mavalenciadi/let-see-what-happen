const User = require("../models/User");

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await User.create({ name, email, password });
    res.json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = { createUser, getUsers };
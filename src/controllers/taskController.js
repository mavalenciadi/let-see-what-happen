const Task = require("../models/Task");

const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTask = await Task.create({ title, description });
    res.json(newTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const getTasks = async (req, res) => {  
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = { createTask, getTasks };
const userModel = require("../models/userModel");

exports.getUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.json(users);
  } catch (err) {
    console.error("Get users error:", err.message);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

exports.createUser = async (req, res) => {
  try {
    const user = await userModel.addUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    console.error("Add user error:", err.message);
    res.status(500).json({ error: "Failed to add user" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const updated = await userModel.updateUser(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: "User not found" });
    res.json(updated);
  } catch (err) {
    console.error("Update user error:", err.message);
    res.status(500).json({ error: "Failed to update user" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deleted = await userModel.deleteUser(req.params.id);
    if (deleted === 0) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Delete user error:", err.message);
    res.status(500).json({ error: "Failed to delete user" });
  }
};

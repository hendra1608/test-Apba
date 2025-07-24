const userModel = require("../models/userModel");
const { encrypt, decrypt } = require("../config/crypto");

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userModel.findUserByCredentials(username, password);

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = encrypt(user.kduser);
    await userModel.updateUserToken(user.kduser, token);

    res.json({ message: "Login Success", token, user });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ error: "Login failed" });
  }
};

exports.logout = (req, res) => {
  try {
    res.json({ message: "Logout success" });
  } catch (err) {
    console.error("Logout error:", err.message);
    res.status(500).json({ error: "Logout failed" });
  }
};

exports.decryptToken = (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: "Token is required" });
  }

  try {
    const decrypted = decrypt(token);
    res.json({ decrypted });
  } catch (err) {
    console.error("Decrypt error:", err.message);
    res.status(400).json({ error: "Invalid token" });
  }
};

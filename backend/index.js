const express = require("express");
const pool = require("./db");
const app = express();
const PORT = process.env.PORT || 3000;
const crypto = require("crypto");
require("dotenv").config();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Utils
const algorith = "aes-256-cbc";
const key = process.env.SECRET_KEY;
const iv = process.env.IV;

function encrypt(text) {
  try {
    const cipher = crypto.createCipheriv(algorith, key, iv);
    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");
    return encrypted;
  } catch (err) {
    console.error("Encrypt error:", err.message);
    throw new Error("Failed to encrypt");
  }
}

function decrypt(text) {
  try {
    const decipher = crypto.createDecipheriv(algorith, key, iv);
    let decrypted = decipher.update(text, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  } catch (err) {
    console.error("Decrypt error:", err.message);
    throw new Error("Failed to decrypt");
  }
}

// Auth middleware
function auth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }
    const token = authHeader.split(" ")[1];
    const user = decrypt(token);
    req.user = user;
    next();
  } catch (err) {
    console.error("Auth error:", err.message);
    return res.status(401).json({ message: "Invalid token" });
  }
}

// Endpoints

// Get users
app.get("/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    console.error("GET /users error:", err.message);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// Add user
app.post("/users", auth, async (req, res) => {
  try {
    const { username, password, name, hakakses, kdklinik, kdcabang } = req.body;
    const result = await pool.query(
      `INSERT INTO users (kduser, username, password, name, hakakses, kdklinik, kdcabang) 
       VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6) RETURNING *`,
      [username, password, name, hakakses, kdklinik, kdcabang]
    );
    console.log("User inserted:", result.rows[0]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("POST /users error:", err.message);
    res.status(500).json({ error: "Failed to add user" });
  }
});

// Update user
app.put("/users/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password, name, hakakses, kdklinik, kdcabang } = req.body;

    const result = await pool.query(
      `UPDATE users 
       SET username=$1, password=$2, name=$3, hakakses=$4, kdklinik=$5, kdcabang=$6 
       WHERE kduser=$7 RETURNING *`,
      [username, password, name, hakakses, kdklinik, kdcabang, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    console.log("User updated:", result.rows[0]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error("PUT /users/:id error:", err.message);
    res.status(500).json({ error: "Failed to update user" });
  }
});

// Delete user
app.delete("/users/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM users WHERE kduser=$1", [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    console.log(`User with ID ${id} deleted`);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("DELETE /users/:id error:", err.message);
    res.status(500).json({ error: "Failed to delete user" });
  }
});

// Login
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("Login attempt:", username);

    const user = await pool.query(
      "SELECT * FROM users WHERE username=$1 AND password=$2",
      [username, password]
    );

    if (user.rows.length === 0) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = encrypt(user.rows[0].kduser);
    await pool.query("UPDATE users SET token=$1 WHERE kduser=$2", [
      token,
      user.rows[0].kduser,
    ]);

    console.log("Login success for:", username);
    res.json({
      message: "Login Success",
      token,
      user: user.rows[0],
    });
  } catch (err) {
    console.error("POST /login error:", err.message);
    res.status(500).json({ error: "Login failed" });
  }
});

// Logout
app.post("/logout", (req, res) => {
  try {
    const { token } = req.body;
    // No session array anymore, so we just confirm logout
    console.log("Logout token:", token);
    res.json({ message: "Logout success" });
  } catch (err) {
    console.error("POST /logout error:", err.message);
    res.status(500).json({ error: "Logout failed" });
  }
});

// Decrypt token
app.post("/decrypt", (req, res) => {
  try {
    const { token } = req.body;
    const decrypted = decrypt(token);
    res.json({ decrypted });
  } catch (err) {
    console.error("POST /decrypt error:", err.message);
    res.status(400).json({ error: "Invalid token" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

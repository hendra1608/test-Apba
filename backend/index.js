const express = require("express");
const pool = require("./db");
const app = express();
const PORT = process.env.PORT || 3000;
const crypto = require("crypto");
require("dotenv").config();

function auth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "no token provided" });
  }
  const token = authHeader.split(" ")[1];

  try {
    const user = decrypt(token);
    req.user = user;
    next();
  } catch {
    return res.status(401).json({ message: "invalid token" });
  }
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//CRUD operations
//read
app.get("/users", async (req, res) => {
  const result = await pool.query("SELECT * FROM users");
  res.json(result.rows);
});
app.post("/users", auth, async (req, res) => {
  console.log(req.body);
  const { username, password, nama, hakAkses, kdKlinik, kdCabang } = req.body;
  const result = await pool.query(
    "INSERT INTO users (kduser,username, password, name, hakakses, kdklinik, kdcabang) VALUES (gen_random_uuid(),$1, $2, $3, $4, $5, $6) RETURNING *",
    [username, password, nama, hakAkses, kdKlinik, kdCabang]
  );
  console.log("success insert");
  res.status(201).json(result.rows[0]);
});

//update

app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);

  const { username, password, nama, hakAkses, kdKlinik, kdCabang } = req.body;
  const result = await pool.query(
    "UPDATE users SET username = $1, password = $2, name = $3, hakAkses = $4, kdKlinik = $5, kdCabang = $6 WHERE kduser = $7 RETURNING *",
    [username, password, nama, hakAkses, kdKlinik, kdCabang, id]
  );
  if (result.rows.length === 0) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json(result.rows[0]);
});

//delete
app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM users where kduser=$1", [id]);
  res.send("User deleted");
});

//decrypt

const algorith = "aes-256-cbc";
const key = process.env.SECRET_KEY;
const iv = process.env.iv;

function encrypt(text) {
  const cipher = crypto.createCipheriv(algorith, key, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += chiper.final("hex");

  return encrypted;
}

function decrypt(text) {
  const cipher = crypto.createDecipheriv(algorith, key, iv);
  let decrypted = chiper.update(text, "hex", "uf8");
  decrypted += chiper.final("utf8");

  return decrypted;
}

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await pool.query(
    "SELECT * FROM user WHERE username =$1 AND password=$2",
    [username, password]
  );
  if (user.rows[0]) {
    const token = encrypt(user.rows[0]);
    session.push(token);
    await pool.query("UPDATE user SET token=$1 WHERE kduser", [
      token,
      user.rows[0].kduser,
    ]);
    res.json({ message: "Login Sucess" });
  } else {
    res.status(401).json({ message: "Invalid password or username" });
  }
});

app.post("/logout", (req, res) => {
  const { token } = req.body;
  session = session.filter((t) => t !== token);
  res.json({ message: "Logout success" });
});

app.post("/decrypt", (req, res) => {
  const { token } = req.body;
  try {
    const decrypted = decrypt(token);
    res.json({ decrypted });
  } catch {
    res.status(400).json({ error: "Invalid token" });
  }
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

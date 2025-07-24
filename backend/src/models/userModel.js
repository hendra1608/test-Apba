const { encrypt, decrypt } = require("../config/crypto");
const pool = require("../config/db");

async function getAllUsers() {
  const result = await pool.query("SELECT * FROM users");
  return result.rows;
}

async function addUser(data) {
  const { username, password, name, hakakses, kdklinik, kdcabang } = data;
  const decryptedPassword = encrypt(password);
  const result = await pool.query(
    `INSERT INTO users (kduser, username, password, name, hakakses, kdklinik, kdcabang) 
     VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6) RETURNING *`,
    [username, decryptedPassword, name, hakakses, kdklinik, kdcabang]
  );
  return result.rows[0];
}

async function updateUser(id, data) {
  const { username, password, name, hakakses, kdklinik, kdcabang } = data;
  const decryptedPassword = encrypt(password);
  const result = await pool.query(
    `UPDATE users SET username=$1, password=$2, name=$3, hakakses=$4, kdklinik=$5, kdcabang=$6 
     WHERE kduser=$7 RETURNING *`,
    [username, decryptedPassword, name, hakakses, kdklinik, kdcabang, id]
  );
  return result.rows[0];
}

async function deleteUser(id) {
  const result = await pool.query("DELETE FROM users WHERE kduser=$1", [id]);
  return result.rowCount;
}

async function findUserByCredentials(username, inputPassword) {
  const result = await pool.query("SELECT * FROM users WHERE username=$1", [
    username,
  ]);

  if (result.rows.length === 0) {
    return;
    // throw new Error("Invalid username or password");
  }

  const user = result.rows[0];

  let dbPassword;
  try {
    dbPassword = decrypt(user.password);
  } catch (err) {
    console.error("Decrypt error:", err.message);
    // throw new Error("Invalid username or password");
    return;
  }

  if (dbPassword !== inputPassword) {
    // throw new Error("Invalid username or password");
    return;
  }

  return user;
}

async function updateUserToken(kduser, token) {
  await pool.query("UPDATE users SET token=$1 WHERE kduser=$2", [
    token,
    kduser,
  ]);
}

module.exports = {
  getAllUsers,
  addUser,
  updateUser,
  deleteUser,
  findUserByCredentials,
  updateUserToken,
};

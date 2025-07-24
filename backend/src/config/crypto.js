const crypto = require("crypto");
const algorithm = "aes-256-cbc";
const key = process.env.SECRET_KEY;
const iv = process.env.IV;

function encrypt(text) {
  const data = JSON.stringify(text);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(data, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}

function decrypt(text) {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(text, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return JSON.parse(decrypted);
}

module.exports = { encrypt, decrypt };

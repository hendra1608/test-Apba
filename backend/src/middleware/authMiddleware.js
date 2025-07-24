const { decrypt } = require("../config/crypto");

function auth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message:
          "pengguna telah logout, silahkan lakukan register atau login akun",
        code: 202,
      });
    }
    const token = authHeader.split(" ")[1];
    const user = decrypt(token);
    next();
  } catch (err) {
    console.error("Auth error:", err.message);
    res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = auth;

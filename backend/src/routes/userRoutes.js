const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middleware/authMiddleware");

router.get("/", auth, userController.getUsers);
router.post("/", auth, userController.createUser);
router.put("/:id", auth, userController.updateUser);
router.delete("/:id", auth, userController.deleteUser);

module.exports = router;

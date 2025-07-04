const express = require("express");
const { register, login, getUserById } = require("../controllers/authController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/:id",getUserById)
module.exports = router;

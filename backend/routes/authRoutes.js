const express = require("express");
const { register, login, getAllUser, updatePassword } = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware")
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/getalluser", getAllUser)
router.put("/changepassword", protect, updatePassword)
module.exports = router;

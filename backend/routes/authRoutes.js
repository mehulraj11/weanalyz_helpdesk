const express = require("express");
const authController = require("../controllers/authController");
const { protect, authorizeRoles } = require("../middlewares/authMiddleware")
const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
// this route works for admin to the database list
router.post("/getalluser", protect, authorizeRoles("admin"), authController.getAllUser)
router.put("/changepassword", protect, authController.updatePassword)
module.exports = router;

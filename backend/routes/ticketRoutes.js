const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');
const { protect, authorizeRoles } = require("../middlewares/authMiddleware");

// USER
router.post('/create', protect, authorizeRoles("user"), ticketController.createTicket);
router.get("/my-tickets", protect, authorizeRoles("user", "technical", "operation"), ticketController.getUserTickets);
router.get("/count", protect, authorizeRoles("user", "technical", "operation"), ticketController.totalTicket)
// OPERATION / ADMIN
router.get("/getalltickets", protect, authorizeRoles("operation", "admin"), ticketController.getAllTickets);
router.post("/op_approvals", protect, authorizeRoles("operation"), ticketController.op_approvals);

// TECHNICAL / OPERATION / ADMIN
router.put("/resolve/:id", protect, authorizeRoles("technical", "operation", "admin"), ticketController.resolveTicket);

module.exports = router;

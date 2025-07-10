const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');
const { protect, authorizeRoles } = require("../middlewares/authMiddleware");

// user , operation, technical, admin
router.post('/create', protect, authorizeRoles("user"), ticketController.createTicket);
router.get("/my-tickets", protect, authorizeRoles("user", "technical", "operation"), ticketController.getUserTickets);
router.get("/count", protect, authorizeRoles("user", "technical", "operation", "admin"), ticketController.ticketCounts)
// operarion
router.get("/getalltickets", protect, authorizeRoles("operation"), ticketController.getAllTickets);
router.post("/op_approvals", protect, authorizeRoles("operation"), ticketController.op_approvals);

// technical, operation
router.put("/resolve/:id", protect, authorizeRoles("technical", "operation"), ticketController.resolveTicket);

module.exports = router;

const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');
const { protect, authorizeRoles } = require("../middlewares/authMiddleware");

// // user , operation, technical

router.get("/count", protect, authorizeRoles("user", "operation", "technical"), ticketController.userTicketsCount)
// // MyTicket.jsx
router.get("/my-tickets", protect, authorizeRoles("user", "technical", "operation"), ticketController.getTickets);
// // NewTicket.jsx
router.post('/create', protect, authorizeRoles("user"), ticketController.createTicket);
// // operarion
router.get("/verifyticket", protect, authorizeRoles("operation"), ticketController.ticketVerify)
router.post("/op_approvals", protect, authorizeRoles("operation"), ticketController.op_approvals);

// // technical, operation
// router.get("/assignedcount", protect, authorizeRoles("operation", "technical"), ticketController.assignedTickets)
router.put("/resolve/:id", protect, authorizeRoles("technical", "operation"), ticketController.resolveTicket);
router.delete("/deleteticket/:id", ticketController.deleteTicket)

// // admin
router.get("/adminticketcount", protect, authorizeRoles("admin"), ticketController.adminTicketCount)
module.exports = router;
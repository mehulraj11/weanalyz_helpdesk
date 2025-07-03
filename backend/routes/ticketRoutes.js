const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');

// Create Ticket Route
router.post('/create', ticketController.createTicket);
router.get("/count", ticketController.totalTicket)
module.exports = router;

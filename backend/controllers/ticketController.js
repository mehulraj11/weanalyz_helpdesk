const Ticket = require("../models/Ticket");

exports.createTicket = async (req, res) => {
    const {
        ticketNo,
        date,
        name,
        department,
        subject,
        category,
        type,
        priority,
        description,
        image,
        // captchaToken, // no longer needed
    } = req.body;

    try {
        const newTicket = await Ticket.create({
            ticketNo,
            date,
            name,
            department,
            subject,
            category,
            type,
            priority,
            description,
            image,
        });

        res.status(201).json({ message: "Ticket created", ticket: newTicket });
    } catch (error) {
        console.error("Ticket creation error:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};
exports.totalTicket = async (req, res) => {
    try {
        const count = await Ticket.countDocuments();
        res.status(200).json({ totalTickets: count });
    } catch (err) {
        res.status(500).json({ message: "Error fetching ticket count" });
    }
}
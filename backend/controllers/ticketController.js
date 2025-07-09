const Ticket = require("../models/Ticket");
const User = require("../models/User");

exports.createTicket = async (req, res) => {
    try {
        const ticketData = {
            ...req.body,
            createdBy: req.user.id, // logged-in user
            status: "Pending"
        };
        console.log(ticketData.createdBy);

        const ticket = await Ticket.create(ticketData);
        res.status(201).json({ message: "Ticket created", ticket });
    } catch (err) {
        console.log("Ticket Creation Error : " + err.message);

        res.status(500);
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
exports.getAllTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find()
            .populate("createdBy", "username role")
            .populate("assignedTo", "username role");
        res.status(200).json(tickets);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.getUserTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find({ createdBy: req.user.id });
        res.status(200).json(tickets);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.op_approvals = async (req, res) => {
    try {
        const { role, ticketId } = req.body;

        if (!role || !ticketId)
            return res.status(400).json({ message: "Missing role or ticketId" });

        // Find one user with the given role
        const user = await User.findOne({ role });
        if (!user) return res.status(404).json({ message: "No user with role found" });

        const updatedTicket = await Ticket.findByIdAndUpdate(
            ticketId,
            { assignedTo: user._id, status: "In Progress" },
            { new: true }
        );

        res.status(200).json({ message: "Ticket assigned", ticket: updatedTicket });
    } catch (err) {
        console.log("Ticket Approval Error : " + err.message);

        res.status(500).json({ message: "Server error", error: err.message });
    }
};
exports.resolveTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id);

        if (!ticket) return res.status(404).json({ message: "Ticket not found" });

        if (ticket.assignedTo.toString() !== req.user.id && req.user.role !== "admin") {
            return res.status(403).json({ message: "You are not allowed to resolve this ticket" });
        }

        ticket.status = "Resolved";
        await ticket.save();

        res.status(200).json({ message: "Ticket resolved", ticket });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

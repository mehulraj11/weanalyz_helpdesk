const Ticket = require("../models/Ticket");
const User = require("../models/User");

exports.createTicket = async (req, res) => {
    try {
        const ticketData = {
            ...req.body,
            createdBy: req.user.id,
        };
        console.log(ticketData.createdBy);
        const ticket = await Ticket.create(ticketData);
        res.status(201).json({ message: "Ticket created", ticket });
    } catch (err) {
        console.log("Ticket Creation Error : " + err.message);
        res.status(500).json({ message: err.message });
    }
};

exports.ticketCounts = async (req, res) => {
    try {
        const total = await Ticket.countDocuments();
        const resolved = await Ticket.countDocuments({ status: "Resolved" });
        const pending = await Ticket.countDocuments({ status: "Pending" });
        const inProgress = await Ticket.countDocuments({ status: "In Progress" });
        const op_team = await User.countDocuments({ role: "operation" });
        const tech_team = await User.countDocuments({ role: "technical" });

        res.status(200).json({
            totalTickets: total,
            resolvedTickets: resolved,
            pendingTickets: pending,
            inProgressTickets: inProgress,
            op_team: op_team,
            tech_team: tech_team
        });
    } catch (err) {
        console.log("Ticket Counts Error: " + err.message);
        res.status(500).json({ message: err.message });
    }
};

exports.getAllTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find()
            .populate("createdBy", "username role")
            .populate("assignedTo", "username role");
        res.status(200).json(tickets);
    } catch (err) {
        console.log("get All Ticket : " + err.message);
        res.status(500).json({ message: "Server error" });
    }
};

exports.getUserTickets = async (req, res) => {
    try {
        let tickets;

        if (req.user.role === "user") {
            tickets = await Ticket.find({ createdBy: req.user.id });
        } else {
            tickets = await Ticket.find({ assignedTo: req.user.id });
        }

        res.status(200).json(tickets);
    } catch (err) {
        console.log("Ticket GET AQ Role Error : " + err.message);
        res.status(500).json({ message: err.message });
    }
};
exports.op_approvals = async (req, res) => {
    try {
        const role = req.body.assignedTo;
        const ticketId = req.body.ticketNo;
        // console.log(ticketId);
        if (!role || !ticketId)
            return res.status(404).json({ message: "Missing role or ticketId" });
        const user = await User.findOne({ role });
        if (!user) return res.status(404).json({ message: "No role found" });

        const updatedTicket = await Ticket.findOneAndUpdate(
            { "ticketNo": ticketId },
            { $set: { status: "In Progress", assignedTo: user._id } },
            { new: true }
        );

        if (!updatedTicket) {
            return res.status(404).json({ message: "Ticket not found" });
        }
        res.status(200).json({ message: "Ticket assigned", ticket: updatedTicket });
    } catch (err) {
        console.log("Ticket Approval Error : " + err.message);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};
exports.resolveTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findOne({ ticketNo: req.params.id });
        console.log(ticket);
        if (!ticket) return res.status(404).json({ message: "Ticket not found" });

        if (ticket.assignedTo.toString() !== req.user.id && req.user.role !== "admin") {
            return res.status(403).json({ message: "You are not allowed to resolve this ticket" });
        }
        ticket.status = "Resolved";
        await ticket.save();
        res.status(200).json({ message: "Ticket resolved", ticket });
    } catch (err) {
        console.log("Ticket reslove error : " + err.message);
        res.status(500).json({ message: "Server error" });
    }
};
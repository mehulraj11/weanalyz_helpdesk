const Ticket = require("../models/Ticket");
const User = require("../models/User");

// USER CONTROLLERS
// this controller works for the counting of the tickets for each user only
exports.userTicketsCount = async (req, res) => {
    try {
        // const userId = req.user.id;
        const user = await User.find({ _id: req.user.id })
        const role = user[0].role;
        // console.log(role);

        let filter;
        if (role === "user") {
            filter = { createdBy: req.user.id };
        } else {
            filter = { assignedTo: req.user.id }
        }

        const total = await Ticket.countDocuments(filter);
        const resolved = await Ticket.countDocuments({ ...filter, status: "Resolved" });
        const pending = await Ticket.countDocuments({ ...filter, status: "Pending" });
        const inProgress = await Ticket.countDocuments({ ...filter, status: "In Progress" });

        res.status(200).json({
            totalTickets: total,
            resolvedTickets: resolved,
            pendingTickets: pending,
            inProgressTickets: inProgress,
        });

    } catch (err) {
        console.log("My Tickets Count Error: " + err.message);
        res.status(500).json({ message: err.message });
    }
};

// this will work for the user to create a new ticket
exports.createTicket = async (req, res) => {
    try {
        const ticketData = {
            ...req.body,
            createdBy: req.user.id,
        };
        // console.log(ticketData);

        // console.log(ticketData.createdBy);
        const ticket = await Ticket.create(ticketData);
        res.status(201).json({ message: "Ticket created", ticket });
    } catch (err) {
        console.log("Ticket Creation Error : " + err.message);
        res.status(500).json({ message: err.message });
    }
};

// OPERATIOIN AND TECHNICAL CONTROLLERS
// this is for the opertion team to process the ticket either send it to itself or techinalc
exports.ticketVerify = async (req, res) => {
    try {
        const tickets = await Ticket.find({ status: "Pending" })
            .populate("createdBy", "username role status")
            .populate("assignedTo", "username role status");

        console.log(tickets);

        res.status(200).json(tickets);
    } catch (err) {
        console.log("get All Ticket : " + err.message);
        res.status(500).json({ message: "Server error" });
    }
};
// this will work only for operation for approve it to itself or technical
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

exports.deleteTicket = async (req, res) => {
    const { id } = req.params;
    // console.log(ticketId);
    try {
        const deleted = await Ticket.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ message: "Ticket not found" });
        }
        res.status(200).json({ message: "Ticket deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: "Error deleting ticket", error });

    }

}

// ADMIN CONTROLLERS
// ths works for admin to count total number of tickets present in database
exports.adminTicketCount = async (req, res) => {
    try {
        const total = await Ticket.countDocuments();
        const resolvedTickets = await Ticket.countDocuments({ status: "Resolved" })
        const inProgressTickets = await Ticket.countDocuments({ status: "In Progress" })
        const pendingTickets = await Ticket.countDocuments({ status: "Pending" })
        res.status(200).json({
            total, resolvedTickets, pendingTickets, inProgressTickets
        })
    } catch (error) {

    }
}

// this controller will work for the listing of the tickets for the logged users such as user, operation, admin
exports.getTickets = async (req, res) => {
    try {
        console.log("Fetching tickets for user:", req.user.id, "Role:", req.user.role);

        let tickets;

        if (req.user.role === "user") {
            // For users, get tickets they created
            tickets = await Ticket.find({ createdBy: req.user.id })
                .populate("assignedTo", "username role")
                .populate("createdBy", "username role")
                .sort({ createdAt: -1 });
        } else {
            // For non-users, get tickets assigned to them
            tickets = await Ticket.find({ assignedTo: req.user.id })
                .populate("assignedTo", "username role")
                .populate("createdBy", "username role")
                .sort({ createdAt: -1 });
        }

        console.log("Found tickets:", tickets.length);
        res.status(200).json(tickets);

    } catch (err) {
        console.error("Ticket GET Error:", err.message);
        console.error("Full Error:", err);
        res.status(500).json({
            message: "Failed to fetch tickets",
            error: err.message
        });
    }
};

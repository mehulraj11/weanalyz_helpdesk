const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
    ticketNo: {
        type: Number,
        required: true,
        unique: true,
    },
    date: {
        type: Date,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    priority: {
        type: String,
        enum: ["Low", "Medium", "High"], // optional constraint
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String, // will store image URL or base64 or filename
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    status: {
        type: String,
        default: "Pending", // or "Open", "In Progress", "Resolved"
    },
}, { timestamps: true });

module.exports = mongoose.model("Ticket", ticketSchema);

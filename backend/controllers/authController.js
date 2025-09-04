const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    const { username, email, password, role } = req.body;
    if (!username || !email || !password || !role) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({ username, email, password: hashedPassword, role });
        console.log(newUser);
        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        res.json({
            token,
            user: { id: user._id, username: user.username, role: user.role, email: user.email },
        });
        console.log(user.username + " logged")
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};
exports.getAllUser = async (req, res) => {

    try {
        const whichRole = req.body.whichRole;
        const userList = await User.find({ role: "user" });
        const operarionList = await User.find({ role: "operation" });
        const technicalList = await User.find({ role: "technical" })
        if (whichRole == "user") {
            res.json(userList)
        }
        else if (whichRole == "operation") {
            res.json(operarionList)
        }
        else if (whichRole == "technical") {
            res.json(technicalList)
        }
        else {
            return res.status(404).json({ message: "No role" });
        }
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

exports.updatePassword = async (req, res) => {
    const { email, currentPassword, newPassword } = req.body;
    try {
        const updatedUser = await User.findOne({ email: email });
        if (!updatedUser) { return res.status(404).json({ message: "User not found" }); }
        const isMatch = await bcrypt.compare(currentPassword, updatedUser.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Old password is incorrect" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        updatedUser.password = hashedPassword;
        await updatedUser.save();
        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}
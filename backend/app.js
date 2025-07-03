const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/database.js");
const authRoutes = require("./routes/authRoutes.js")
const ticketRoutes = require("./routes/ticketRoutes.js")
dotenv.config();
const app = express();

app.use(cors({
  origin: "http://localhost:5173", // your React app's URL
  credentials: true
}));

app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/tickets", ticketRoutes)
app.get("/", (req, res) => {
  res.send("Helpdesk API Running");
});

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);

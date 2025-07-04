const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/database.js");
const authRoutes = require("./routes/authRoutes.js")
const ticketRoutes = require("./routes/ticketRoutes.js")
dotenv.config();
const app = express();

import cors from "cors";

const allowedOrigins = [
  "http://localhost:5173", // for local dev
  "https://weanalyz-helpdesk-frontend.vercel.app", // (optional) for deployed frontend
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));


app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/tickets", ticketRoutes)


app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);

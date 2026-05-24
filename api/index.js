const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || "*", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", require("../routes/auth"));
app.use("/api/pets", require("../routes/pet"));
app.use("/api/requests", require("../routes/request"));

app.get("/", (req, res) => res.json({ message: "Pet Adoption API is running" }));

mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 10000 })
  .then(() => console.log("MongoDB connected"))
  .catch(e => console.error("MongoDB error:", e.message));

module.exports = app;

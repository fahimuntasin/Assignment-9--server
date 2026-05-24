const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth");
const petRoutes = require("./routes/pet");
const requestRoutes = require("./routes/request");

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/pets", petRoutes);
app.use("/api/requests", requestRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Pet Adoption API is running" });
});

module.exports = app;

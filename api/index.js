const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const app = express();
app.use(cors({ origin: "https://client-seven-mu-30.vercel.app", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => res.json({ message: "Pet Adoption API is running" }));

let cachedDb = false;
async function connectDB() {
  if (cachedDb) return;
  await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 8000 });
  cachedDb = true;
}

app.use("/api", async (req, res, next) => {
  if (req.path === "/") return next();
  try {
    await connectDB();
    next();
  } catch (e) {
    console.error("DB connect error:", e.message);
    res.status(500).json({ error: "Database connection failed" });
  }
});

app.use("/api/auth", require("../routes/auth"));
app.use("/api/pets", require("../routes/pet"));
app.use("/api/requests", require("../routes/request"));

module.exports = app;

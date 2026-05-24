const mongoose = require("mongoose");
const app = require("../index");

let cachedDb = null;

async function connectDB() {
  if (cachedDb) return;
  try {
    cachedDb = await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected (serverless)");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
  }
}

module.exports = async (req, res) => {
  await connectDB();
  return app(req, res);
};

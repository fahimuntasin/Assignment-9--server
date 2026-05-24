const mongoose = require("mongoose");
const serverless = require("serverless-http");
const app = require("../app");

let cachedDb = false;

async function connectDB() {
  if (cachedDb) return;
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 15000,
    });
    cachedDb = true;
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
  }
}

const handler = serverless(app);

module.exports = async (req, res) => {
  await connectDB();
  return handler(req, res);
};

const mongoose = require("mongoose");

const petSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Pet name is required"],
      trim: true,
    },
    species: {
      type: String,
      required: [true, "Species is required"],
    },
    breed: {
      type: String,
      required: [true, "Breed is required"],
    },
    age: {
      type: Number,
      required: [true, "Age is required"],
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
      required: true,
    },
    image: {
      type: String,
      required: [true, "Image URL is required"],
    },
    healthStatus: {
      type: String,
      default: "Healthy",
    },
    vaccinationStatus: {
      type: String,
      default: "Vaccinated",
    },
    location: {
      type: String,
      required: [true, "Location is required"],
    },
    adoptionFee: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ownerEmail: {
      type: String,
      required: true,
    },
    adopted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pet", petSchema);

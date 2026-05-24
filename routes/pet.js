const express = require("express");
const router = express.Router();
const {
  createPet,
  getAllPets,
  getPetById,
  updatePet,
  deletePet,
  getMyListings,
} = require("../controllers/petController");
const { authenticate } = require("../middleware/auth");

router.get("/", getAllPets);
router.get("/my-listings", authenticate, getMyListings);
router.post("/", authenticate, createPet);
router.get("/:id", getPetById);
router.put("/:id", authenticate, updatePet);
router.delete("/:id", authenticate, deletePet);

module.exports = router;

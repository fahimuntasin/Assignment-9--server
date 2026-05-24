const Pet = require("../models/Pet");
const Request = require("../models/Request");

exports.createPet = async (req, res) => {
  try {
    const petData = {
      ...req.body,
      owner: req.user._id,
      ownerEmail: req.user.email,
    };

    const pet = await Pet.create(petData);
    res.status(201).json(pet);
  } catch (error) {
    res.status(400).json({ message: error.message || "Failed to create pet" });
  }
};

exports.getAllPets = async (req, res) => {
  try {
    const { search, species } = req.query;
    const query = {};

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    if (species && species !== "all") {
      const speciesList = species.split(",");
      query.species = { $in: speciesList };
    }

    const pets = await Pet.find(query)
      .populate("owner", "name email")
      .sort({ createdAt: -1 });

    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getPetById = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id).populate("owner", "name email photoURL");

    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    res.json(pet);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updatePet = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);

    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    if (pet.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updatedPet = await Pet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json(updatedPet);
  } catch (error) {
    res.status(400).json({ message: error.message || "Failed to update pet" });
  }
};

exports.deletePet = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);

    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    if (pet.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await Request.deleteMany({ pet: pet._id });
    await Pet.findByIdAndDelete(req.params.id);

    res.json({ message: "Pet deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getMyListings = async (req, res) => {
  try {
    const pets = await Pet.find({ owner: req.user._id }).sort({ createdAt: -1 });
    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

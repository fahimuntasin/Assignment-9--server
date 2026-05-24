const Request = require("../models/Request");
const Pet = require("../models/Pet");

exports.createRequest = async (req, res) => {
  try {
    const { petId, pickupDate, message } = req.body;
    const user = req.user;

    const pet = await Pet.findById(petId);
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    if (pet.adopted) {
      return res.status(400).json({ message: "This pet is already adopted" });
    }

    if (pet.owner.toString() === user._id.toString()) {
      return res.status(400).json({ message: "You cannot request your own pet" });
    }

    const existingRequest = await Request.findOne({
      pet: petId,
      user: user._id,
      status: "pending",
    });

    if (existingRequest) {
      return res.status(400).json({ message: "You already have a pending request for this pet" });
    }

    const adoptionRequest = await Request.create({
      pet: petId,
      user: user._id,
      petName: pet.name,
      userName: user.name,
      userEmail: user.email,
      pickupDate,
      message: message || "",
    });

    res.status(201).json(adoptionRequest);
  } catch (error) {
    res.status(400).json({ message: error.message || "Failed to create request" });
  }
};

exports.getMyRequests = async (req, res) => {
  try {
    const requests = await Request.find({ user: req.user._id })
      .populate("pet", "name species breed image location")
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getRequestsForPet = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.petId);

    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    if (pet.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const requests = await Request.find({ pet: req.params.petId })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.approveRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id).populate("pet");

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    if (request.pet.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (request.status !== "pending") {
      return res.status(400).json({ message: "Request is not pending" });
    }

    request.status = "approved";
    await request.save();

    await Request.updateMany(
      { pet: request.pet._id, _id: { $ne: request._id }, status: "pending" },
      { status: "rejected" }
    );

    await Pet.findByIdAndUpdate(request.pet._id, { adopted: true });

    res.json(request);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.rejectRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id).populate("pet");

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    if (request.pet.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (request.status !== "pending") {
      return res.status(400).json({ message: "Request is not pending" });
    }

    request.status = "rejected";
    await request.save();

    res.json(request);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.cancelRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    if (request.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    request.status = "cancelled";
    await request.save();

    res.json({ message: "Request cancelled" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

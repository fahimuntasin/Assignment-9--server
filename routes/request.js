const express = require("express");
const router = express.Router();
const {
  createRequest,
  getMyRequests,
  getRequestsForPet,
  approveRequest,
  rejectRequest,
  cancelRequest,
} = require("../controllers/requestController");
const { authenticate } = require("../middleware/auth");

router.post("/", authenticate, createRequest);
router.get("/my", authenticate, getMyRequests);
router.get("/pet/:petId", authenticate, getRequestsForPet);
router.put("/:id/approve", authenticate, approveRequest);
router.put("/:id/reject", authenticate, rejectRequest);
router.put("/:id/cancel", authenticate, cancelRequest);

module.exports = router;

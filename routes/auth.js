const express = require("express");
const router = express.Router();
const { register, login, googleLogin, logout, getMe } = require("../controllers/authController");
const { authenticate } = require("../middleware/auth");

router.post("/register", register);
router.post("/login", login);
router.post("/google", googleLogin);
router.post("/logout", logout);
router.get("/me", authenticate, getMe);

module.exports = router;

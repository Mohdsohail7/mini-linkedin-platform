const express = require("express");
const { getUserProfile, updateUserProfile } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// View user profile by ID
router.get("/:id", getUserProfile);

// Update profile (auth required)
router.put("/:id", authMiddleware,updateUserProfile);

module.exports = router;
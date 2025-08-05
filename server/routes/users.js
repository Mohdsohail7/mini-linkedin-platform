const express = require("express");
const { getUserProfile } = require("../controllers/userController");
const router = express.Router();

// View user profile by ID
router.get("/:id", getUserProfile);
module.exports = router;
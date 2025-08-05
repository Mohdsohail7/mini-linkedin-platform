const express = require("express");
const { getAllPost, createPost } = require("../controllers/postController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// public feed
router.get("/", getAllPost);

// Authenticated post creation
router.post("/",authMiddleware,createPost);
module.exports = router;
const express = require("express");
const { getAllPost, createPost, deletePost } = require("../controllers/postController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// public feed
router.get("/", getAllPost);

// Authenticated post creation
router.post("/",authMiddleware,createPost);

// Delete post (auth required)
router.delete("/:id", authMiddleware, deletePost);
module.exports = router;
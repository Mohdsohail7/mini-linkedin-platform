const Post = require("../models/Post");


// create a new post
exports.createPost = async (req, res) => {
    try {
        const { content } = req.body;

        // validate content
        if (!content) {
            return res.status(400).json({ message: "Content is required."});
        }

        // new post
        const newPost = new Post({ content, author: req.user.userId });
        await newPost.save();

        return res.status(201).json({ message: "Post Created.", post: newPost });
    } catch (err) {
        return res.status(500).json({ message: "Server Error", error: err.message });
    }
}

// Get all posts for the feed
exports.getAllPost = async (req, res) => {
    try {
        const posts = await Post.find().populate("author", "name email").sort({ createdAt: -1 });
        return res.status(200).json(posts);
    } catch (err) {
        return res.status(500).json({ message: "Server Error", error: err.message });
    }
}

// post delete
exports.deletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found."});
        }

        // post by this user
        if (post.author.toString() !== req.user.userId) {
            return res.status(403).json({ message: "Unauthorized."});
        }

        await Post.findByIdAndDelete(postId);

        return res.json({ message: "Post Deleted."})
    } catch (err) {
        return res.status(500).json({ message: "Server Error", error: err.message });
    }
}
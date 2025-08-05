const Post = require("../models/Post");
const User = require("../models/User");


exports.getUserProfile = async (req, res) => {
    try {
        const userId = req.params.id;

        // get user (exclude password)
        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found"});
        }

        // get user posts
        const posts = await Post.find({ author: userId }).sort({ createdAt: -1 });

        return res.status(200).json({ user, posts });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}
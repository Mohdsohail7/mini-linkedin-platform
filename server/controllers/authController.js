const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // check if user exist
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists."});
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // save user
        const user = new User({
            name, email, password: hashedPassword
        });
        await user.save();

        // return succesfull resposne
        return res.status(201).json({ message: "User registered successfully", user: user });
    } catch (err) {
        return res.status(500).json({ message: "Server Error", error: err.message });
    }
}

// login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // check user is exist
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials."});
        }
        
        // check password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Invalid Password."});
        }

        // generate jwt token
        const token = jwt.sign({ userId: user._id}, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });

        return res.status(200).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                bio: user.bio
            }
        });

    } catch (err) {
        return res.status(500).json({ message: "Server Error", error: err.message });
    }
}
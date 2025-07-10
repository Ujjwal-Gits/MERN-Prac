const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
try {
    const {
        name, email, password, role
    }= req.body;

    const exists = await User.findOne({ email });
    if (exists) {
        return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
        name,
        email,
        password: hashedPassword,
        role
    });
    
        await user.save();
        return res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
    };

    const loginUser = async (req, res) => {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select("+password");

        console.log(user);
        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        };
        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });
        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    };

    const getCurrentUser = async (req, res) => {
        try {
            const user = await User.findById(req.user.id).populate("employeeID", "name departmentID").select("-password");
            if (!user)
                return res.status(404).json({ message: "User not found" });
    
            return res.json({ success: true, user });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    };

    module.exports = {
        registerUser,
        loginUser,
        getCurrentUser
    };
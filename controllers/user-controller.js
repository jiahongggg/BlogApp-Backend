import User from "../model/User";
import bcrypt from 'bcryptjs';

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        if (users.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }
        return res.status(200).json({ users });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const signup = async (req, res, next) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists! Login instead" });
        }
        const hashedPassword = bcrypt.hashSync(password);
        const user = new User({
            name,
            email,
            password: hashedPassword,
            blogs: [],
        });
        await user.save();
        return res.status(201).json({ user });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: "Couldn't find user with this email" });
        }
        const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Incorrect password" });
        }
        return res.status(200).json({ message: "Login successful" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

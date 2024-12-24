import User from "../models/userModel.js"
import asyncHandler from "../middlewares/asyncHandler.js"
import bcrypt from "bcryptjs"
import createToken from "../utils/createToken.js"


const createUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        throw new Error("Please fill all the inputs .");
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).send("User already exists");
    }


    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    const newUser = new User({ username, email, password: hashedPassword });

    try {
        await newUser.save()
        createToken(res, newUser._id);

        res.status(201).json({ _id: newUser._id, username: newUser.username, email: newUser.email, isAdmin: newUser.isAdmin })
    } catch (error) {
        console.error("Error saving user or creating token:", error);
        res.status(400)
        throw new Error("Invalid user data")
    }

});


const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new Error("Please fill all the inputs .");
    }

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).send("User does not exist");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).send("Invalid password");
    }

    if (isMatch) {
        createToken(res, user._id);
        res.status(201).json({ _id: user._id, username: user.username, email: user.email, isAdmin: user.isAdmin });
        return;
    }


});

const logoutCurrentUser = asyncHandler(async (req, res) => {

    res.cookie('jwt', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV != 'development',
        sameSite: 'strict',
        expires: new Date(0)
    });

    res.status(200).json({ message: "Logged out successfully" });

});


const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
});


const getCurrentUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({ _id: user._id, username: user.username, email: user.email });
    }else{
        res.status(404);
        throw new Error("User not found");
    }
});


export { createUser, loginUser, logoutCurrentUser, getAllUsers, getCurrentUserProfile };
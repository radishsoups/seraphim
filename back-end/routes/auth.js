// this is a route for authentication
import express from "express";
import User from "../models/user.model.js";
import Setting from "../models/setting.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

// hardcode data: waiting to be deleted
export let user = {
  id: 1,
  display_name: "",
  username: "",
  about: "This user hasn’t added a bio yet...",
  posts: [],
  communities: [],
  profile_pic: "default_pic.png",
  signedIn: true,
  followers: [],
  following: [],
};

export const signup = async (req, res) => {
  try {
    const { name, username, password, email } = req.body;
    const existingEmail = await User.findOne({ email });
    const existingUsername = await User.findOne({ username });

    if (!name || !username || !password || !email) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists!" });
    }
    if (existingUsername) {
      return res.status(400).json({ message: "Username already exists!" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password too short!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
      profilePicture: "default_pic.png",
    });

    await user.save();

    //todo: implement mailTrap api
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });

    // set up default user settings on signup
    const setting = new Setting({
      userId: user._id,
      mutedWords: [],
      blockedUsers: [],
      blockedCommunities: [],
      displayMode: "Light",
      fontSize: 16,
      imagePreference: "Show",
    });

    await setting.save();

    await res.cookie("jwt-seraphim", token, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error("Error in signup", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // create a cookie
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });

    await res.cookie("jwt-seraphim", token, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    res
      .status(201)
      .json({ message: "Logged in successfully", username, password });
  } catch (error) {
    console.error("Error in login", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("jwt-seraphim");
  res.status(200).json({ message: "Logged out successfully" });
};

export const getCurrentUser = (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    console.error("Error in getCurrentUser", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const continueResetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    // console.log(email);
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }
    res.status(200).json({ message: "User found", user });
  } catch (error) {
    console.log("Error in continueResetPassword", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, newpassword, confirmpassword } = req.body;
    const user = await User.findOne({ email: email });
    if (!newpassword || newpassword.length < 6) {
      return res.status(400).json({ message: "New password too short!" });
    }
    if (newpassword !== confirmpassword) {
      return res.status(400).json({ message: "Passwords do not match!" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newpassword, salt);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.log("Error in resetPassword", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

router.post("/api/signup", signup);
router.post("/api/login", login);
router.post("/api/logout", logout);
router.post("/api/continueReset", continueResetPassword);
router.post("/api/reset", resetPassword);

export default router;

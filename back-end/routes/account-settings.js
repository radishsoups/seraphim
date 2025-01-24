// import and instantiate express
import express from 'express'
import User from "../models/user.model.js";
import { protectRouter } from "../middlewares/auth.middleware.js";

const router = express.Router();

// account settings
router.get("/api/account-settings", protectRouter, async (req, res) => {
    try {
        // getting user id from cookies
        const userId = req.user._id

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const name = user.name;
        const username = user.username;
        const email = user.email;
        const password = user.password;

        const data = {
            "id": userId,
            "username": username,
            "name": name,
            "email": email,
            "password": password
        }

        return res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: "Could not get data" })
    }
});

export default router
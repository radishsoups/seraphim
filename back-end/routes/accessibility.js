// import and instantiate express
import express from 'express'
const router = express.Router();
import Setting from "../models/setting.model.js";
import { protectRouter } from "../middlewares/auth.middleware.js";
import { check, validationResult } from 'express-validator';


router.get("/api/color-mode", protectRouter, async (req, res) => {
    // get user's current color-mode
    try {
        // getting user id from cookies
        const id = req.user._id

        const user = await Setting.findOne({ userId: id });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const color = user.displayMode;

        res.status(200).json(color)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to get color mode' });
    }
});

router.post("/api/color-mode", protectRouter,
    [
        check('color')
            .isIn(['Light', 'Dark'])
            .isString()
            .withMessage("Request must be 'Light' or 'Dark'"),
    ],
    async (req, res) => {
        // change user's current color-mode
        const errors = validationResult(req);

        // validate request
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            // getting user id from cookies
            const id = req.user._id

            const color = req.body.color

            // update information
            await Setting.updateOne({ userId: id }, { displayMode: color });

            res.status(200).json(color)
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to change color mode' });
        }
    });

// router.get("/api/image-mode", protectRouter, async (req, res) => {
//     // get user's current image mode
//     try {
//         // getting user id from cookies
//         const id = req.user._id

//         const user = await Setting.findOne({ userId: id });
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         const image = user.imagePreference;

//         res.status(200).json(image)
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Failed to get image mode' });
//     }
// });

// router.post("/api/image-mode", protectRouter, async (req, res) => {
//     // change user's current image mode
//     try {
//         // getting user id from cookies
//         const id = req.user._id

//         const image = req.body.image

//         // update information
//         await Setting.updateOne({ userId: id }, { imagePreference: image });

//         res.status(200).json(image)
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Failed to change image mode' });
//     }
// });

router.get("/api/font-size", protectRouter, async (req, res) => {
    // get user's current font size
    try {
        // getting user id from cookies
        const id = req.user._id

        const user = await Setting.findOne({ userId: id });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const font = user.fontSize;

        res.status(200).json(font)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to get font size' });
    }
});

router.post("/api/font-size", protectRouter,
    [
        check('fontSize')
            .isNumeric()
            .withMessage("Request must be a valid number"),
    ],
    async (req, res) => {
        // change user's current font size
        const errors = validationResult(req);

        // validate request
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            // getting user id from cookies
            const id = req.user._id

            const size = req.body.fontSize

            // update information
            await Setting.updateOne({ userId: id }, { fontSize: size });

            res.status(200).json(size)
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to change font size' });
        }
    });

export default router
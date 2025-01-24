// import and instantiate express
import express from 'express'
const router = express.Router();
import Setting from "../models/setting.model.js";
import { protectRouter } from "../middlewares/auth.middleware.js";
import { check, validationResult } from "express-validator";

// muted words
router.get("/api/muted-words", protectRouter, async (req, res) => {
    // getting user id from cookies
    const id = req.user._id

    try {
        const user = await Setting.findOne({ userId: id });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const mutedWordData = user.mutedWords;

        res.json(mutedWordData);
    } catch (error) {
        res.status(500).json({ error: "Could not get data." })
    }
});

// mute and unmute words
router.post("/api/muted-words", protectRouter,
    [
        check('request')
            .isIn(['mute', 'unmute'])
            .withMessage("Request must be 'mute' or 'unmute'"),
        check('id')
            .optional()
            .isString()
            .withMessage("ID field must be a string if provided."),
    ],
    async (req, res) => {
        const request = req.body.request

        // getting user id from cookies
        const id = req.user._id

        if (request === 'unmute') {
            try {
                const wordId = req.body.id.trim().toLowerCase();

                // update muted word data
                await Setting.updateOne({ userId: id }, { $pull: { mutedWords: wordId } });

                // fetch updated user information
                const user = await Setting.findOne({ userId: id });
                const mutedWordData = user.mutedWords;

                res.status(200).json({ words: mutedWordData, message: "Muted word successfully!" })
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Failed to unmute word' });
            }
        }
        else if (request === 'mute') {
            try {
                const word = req.body.word.trim().toLowerCase();

                // get current information
                const user = await Setting.findOne({ userId: id });
                const mutedWordData = user.mutedWords;

                // preventing duplicates
                const wordInList = mutedWordData.find(w => w === word);

                if (wordInList) {
                    return res.status(200).json({
                        words: mutedWordData,
                        message: "You have already blocked this word.",
                    });
                }

                // update muted word data
                await Setting.updateOne({ userId: id }, { $push: { mutedWords: word } });

                // fetch updated data 
                const updatedUser = await Setting.findOne({ userId: id });
                const newData = updatedUser.mutedWords;

                res.status(200).json({ words: newData, message: "Muted word successfully!" })
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Failed to mute word' });
            }
        }
    });

export default router;
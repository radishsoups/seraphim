// import and instantiate express
import express from 'express'
const router = express.Router();
import User from "../models/user.model.js";
import Setting from "../models/setting.model.js";
import Post from '../models/post.model.js';
import Community from "../models/community.model.js"
import { protectRouter } from "../middlewares/auth.middleware.js";
import { check, validationResult } from 'express-validator';

router.post("/api/deactivate", protectRouter,
    [
        check('request')
            .isIn(['deactivate'])
            .isString()
            .notEmpty()
            .withMessage("Request must be 'deactivate'")
    ],
    async (req, res) => {
        const errors = validationResult(req);

        // validate request
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const id = req.user._id

            // dropping user from database
            await User.findOneAndDelete({ _id: id })
            await Setting.findOneAndDelete({ userId: id })
            await Post.findOneAndDelete({ madeBy: id })
            await Community.updateMany(
                { members: id },
                { $pull: { members: id } }
            );

            res.status(200).send('User deactivated')
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to deactivate' });
        }
    });

export default router
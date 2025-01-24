// import and instantiate express
import express from 'express'
const router = express.Router();
import Setting from "../models/setting.model.js";
import Community from '../models/community.model.js';
import { protectRouter } from "../middlewares/auth.middleware.js";
import { check, validationResult } from 'express-validator';

// blocked communities
router.get("/api/blocked-communities", protectRouter, async (req, res) => {
    // getting user id from cookies
    const id = req.user._id

    const user = await Setting.findOne({ userId: id });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const blockedCommunityData = user.blockedCommunities;

    try {
        res.json(blockedCommunityData);
    } catch (error) {
        res.status(500).json({ error: "Could not get data." })
    }
});

// unblock community
router.post("/api/blocked-communities", protectRouter,
    [
        check('request')
            .isIn(['block', 'unblock'])
            .withMessage("Request must be 'block' or 'unblock'"),
        check('name')
            .isString()
            .notEmpty()
            .withMessage("Community name is required and must be a string"),
    ],
    async (req, res) => {
        const errors = validationResult(req);

        // validate request
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { request } = req.body;

        // getting user id from cookies
        const id = req.user._id

        if (request === 'unblock') {
            try {
                const { name } = req.body;

                // check if unblocked user exists
                const unblockCommunity = await Community.findOne({ name });

                if (!unblockCommunity) {
                    return res.status(404).json({ message: "Community not found" });
                }

                // update blocked community data
                await Setting.updateOne({ userId: id }, { $pull: { blockedCommunities: { name } } });

                // fetch updated information
                const user = await Setting.findOne({ userId: id });
                const blockedCommunityData = user.blockedCommunities;

                res.status(200).json(blockedCommunityData)
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Failed to unblock community' });
            }
        }
        else if (request === 'block') {
            try {
                const { name } = req.body;

                // check if community exists
                const community = await Community.findOne({ name });
                if (!community) {
                    return res.status(404).json({ message: "Community not found" });
                }

                // find user and get current blocked community data
                const user = await Setting.findOne({ userId: id });

                if (!user) {
                    return res.status(404).json({ message: "User not found" });
                }

                const blockedCommunityData = user.blockedCommunities;

                // preventing duplicates
                const commInList = blockedCommunityData.find(c => c.community === community);

                if (commInList) {
                    return res.status(200).json({
                        communities: blockedCommunityData,
                        message: "You have already blocked this commmunity.",
                    });
                }

                // update community data
                await Setting.findOneAndUpdate({ userId: id }, { $push: { blockedCommunities: { cid: community, name: name } } });

                // fetch updated information
                const updatedUser = await Setting.findOne({ userId: id });
                const updatedBlockedCommunityData = updatedUser.blockedCommunities;

                res.status(200).json({ communities: updatedBlockedCommunityData, message: "Blocked community successfully!" })
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Failed to unblock community' });
            }
        }
    });

export default router;
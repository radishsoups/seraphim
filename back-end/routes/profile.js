// import and instantiate express
import express from 'express'
import User from "../models/user.model.js";
import { protectRouter } from "../middlewares/auth.middleware.js";

const router = express.Router();

// route for logged-in user profile page
router.get('/api/profile', protectRouter, async (req, res) => {
    try {
        const userId = req.user._id;

        const user = await User.findById(userId)
            .populate("communities", "name description")
            .populate({
                path: "posts",
                populate: [
                    { path: "madeBy", select: "username name profilePicture" },
                    { path: "community", select: "name" },
                    { 
                        path: "replies",
                        populate: { path: "madeBy", select: "username name profilePicture" }
                    }
                ]
            })
            .exec();

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const reshapedCommunities = user.communities.map(community => {
            const firstSentence = community.description.split(".")[0];
            const completeFirstSentence = firstSentence + (community.description.includes(".") ? "." : "");
            
            return {
                id: community._id.toString(),
                name: community.name,
                description: completeFirstSentence,
            };
        });

        const { password, __v, communities, ...safeData } = user.toObject();

        res.status(200).json({ ...safeData, communities: reshapedCommunities, signedIn: true });
    } catch (error) {
        console.error("Error in getting profile information", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
});

// route for other user profile page
router.get('/api/profile/:userId', protectRouter, async (req, res) => {
    try {
        const { userId } = req.params;

        const loggedInUserId = req.user._id.toString();
        if (userId === loggedInUserId) {
            console.log('here')
            return res.status(200).json({ redirectTo: '/api/profile' });
        }

        const user = await User.findById(userId)
            .populate("communities", "name description")
            .populate({
                path: "posts",
                populate: [
                    { path: "madeBy", select: "username name profilePicture" },
                    { path: "community", select: "name" },
                    { 
                        path: "replies",
                        populate: { path: "madeBy", select: "username name profilePicture" }
                    }
                ]
            })
            .exec();

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const reshapedCommunities = user.communities.map(community => {
            const firstSentence = community.description.split(".")[0];
            const completeFirstSentence = firstSentence + (community.description.includes(".") ? "." : "");

            return {
                id: community._id.toString(), 
                name: community.name,
                description: completeFirstSentence,
            };
        });

        const { password, __v, communities, ...safeData } = user.toObject();

        res.status(200).json({ ...safeData, communities: reshapedCommunities, signedIn: false });
    } catch (error) {
        console.error("Error in getting profile information", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
});

// route to update user profile
router.post('/api/profile', protectRouter, async (req, res) => {
    const { name, username, about, email, profilePicture } = req.body;
    try {
        const userId = req.user._id;
        
        const user = await User.updateOne({ _id: userId }, { 
            $set: { 
                name, 
                username, 
                about, 
                email, 
                profilePicture
            } 
        });

        res.status(200).json({ message: "Successfully updated profile" });
    } catch(error) {
        console.error("Error in updating profile information", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
  });

export default router
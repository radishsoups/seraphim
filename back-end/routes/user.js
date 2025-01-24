// Need this for home and post wilson

import express from "express";
import { protectRouter } from "../middlewares/auth.middleware.js";
import User from "../models/user.model.js";
import Setting from "../models/setting.model.js";

const router = express.Router();

router.get("/api/user-communities", protectRouter, async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).populate("communities");
    const communityList = user.communities;

    const blockedData = await Setting.findOne({ userId });
    const blockedCommunities = blockedData.blockedCommunities;

    // // if user has blocked communities
    if (blockedCommunities.length > 0) {
      blockedCommunities.map(comm => {
        communityList.map(c => {
          // remove community
          if (c._id.equals(comm.cid)) {
            let index = communityList.indexOf(c);
            communityList.splice(index, 1);
          }
        });
      });
    };

    res.json({ communities: communityList });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;

import mongoose from "mongoose";

const settingSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  mutedWords: [
    {
      type: String,
    },
  ],
  blockedUsers: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      username: { type: String, required: true }
    },
  ],
  blockedCommunities: [
    {
      cid: { type: mongoose.Schema.Types.ObjectId, ref: "Community", required: true },
      name: { type: String, required: true }
    },
  ],
  displayMode: {
    type: String,
    //default: "light",
  },
  fontSize: {
    type: String,
    //default: "medium",
  },
  imagePreference: {
    type: String,
    //default: "auto",
  },
});

const Setting = mongoose.model("Setting", settingSchema);

export default Setting

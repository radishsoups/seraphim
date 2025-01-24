import mongoose from "mongoose";

const communitySchema = mongoose.Schema(
  {
    //Community id
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    communityPicture: {
      type: String,
      required: true,
      default: "",
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const Community = mongoose.model("Community", communitySchema);

export default Community;

// this is a middleware for user authentication
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// make sure content is under proctect away from unauthorized users
export const protectRouter = async (req, res, next) => {
  try {
    const cookie = req.cookies["jwt-seraphim"];
    // console.log(cookie);
    // console.log(req.cookies);
    if (!cookie) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }
    const decodedCookie = jwt.verify(cookie, process.env.JWT_SECRET);
    // console.log("decodedCookie: ", decodedCookie);
    if (!decodedCookie) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
    const user = await User.findById(decodedCookie.userId).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    // console.log("user: ", user);
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protectRouter middleware: ", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

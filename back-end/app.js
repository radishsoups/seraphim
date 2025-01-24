import express from "express";
// import multer from "multer";
import axios from "axios";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import path from "path";

// import routes
import accountSettings from "./routes/account-settings.js";
import blockedUsers from "./routes/blocked-users.js";
import blockedCommunities from "./routes/blocked-communities.js";
import mutedWords from "./routes/muted-words.js";
import accessibility from "./routes/accessibility.js";
import deactivate from "./routes/deactivate.js";
import auth from "./routes/auth.js";
import community from "./routes/community.js";
import searchCommunity from "./routes/search-community.js";
import createCommunity from "./routes/create-community.js";
import subcommunity from "./routes/subcommunity.js";
import home from "./routes/home.js";
import post from "./routes/post.js";
import profile from "./routes/profile.js";
import multer from "./lib/multer.js";
import userRoutes from "./routes/user.js"; //new 

const app = express(); // instantiate an Express object

// adding CORS middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// use the morgan middleware to log all incoming http requests
app.use(morgan("dev"));

// use express's builtin body-parser middleware to parse any data included in a request
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// make 'public' directory publicly readable with static content
app.use("/public", express.static("public"));
app.use('/uploads', express.static('public/uploads'));

// use routes
app.use(accountSettings);
app.use(blockedUsers);
app.use(blockedCommunities);
app.use(mutedWords);
app.use(accessibility);
app.use(deactivate);

app.use(auth);
app.use(community);
app.use(multer);

app.use(searchCommunity);
app.use(subcommunity);
app.use(createCommunity);

app.use(home);
app.use(post);
app.use(profile);
app.use(userRoutes); //new

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "../front-end/build")));

app.get("*", (req, res) => {
    res.sendFile(path.resolve("build", "index.html"));
  });

export default app;

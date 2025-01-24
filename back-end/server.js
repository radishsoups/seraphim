import app from "./app.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";

dotenv.config();

const server = app;
const PORT = process.env.PORT || 8000;

// call express's listen function to start listening to the port
const listener = server.listen(PORT, function () {
  console.log(`Server running on port: ${PORT}`);
  connectDB();
});

// a function to stop listening to the port
const close = () => {
  listener.close();
};

export default server;

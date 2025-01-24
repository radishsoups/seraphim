import multer from "multer";
import express from "express";
import path from "path";

const router = express.Router();

// enable file uploads saved to disk in a directory named 'public/uploads'
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    // take apart the uploaded file's name so we can create a new one based on it
    const extension = path.extname(file.originalname);
    const basenameWithoutExtension = path.basename(
      file.originalname,
      extension
    );
    // create a new filename with a timestamp in the middle
    const newName = `${basenameWithoutExtension}-${Date.now()}${Math.random()}${extension}`;
    // tell multer to use this new filename for the uploaded file
    cb(null, newName);
  },
});

const upload = multer({ storage: storage });

router.post("/api/upload-pic", upload.single("file"), (req, res) => {
  const data = {
    status: "all good",
    message: "picture is uploaded!!!",
    file: req.file,
  };
  res.json(data);
});

export default router;

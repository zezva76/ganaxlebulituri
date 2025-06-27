const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

app.post("/api/comments", upload.single("photo"), (req, res) => {
  const { name, text } = req.body;
  const photoUrl = req.file ? `/uploads/${req.file.filename}` : null;

  if (!name || !text) {
    return res.status(400).json({ message: "Name and text are required" });
  }

  const commentData = {
    name,
    text,
    photo: photoUrl,
    createdAt: new Date().toISOString(),
  };

  const dataFile = "comments.json";
  let existing = [];

  if (fs.existsSync(dataFile)) {
    const raw = fs.readFileSync(dataFile);
    existing = JSON.parse(raw);
  }

  existing.push(commentData);
  fs.writeFileSync(dataFile, JSON.stringify(existing, null, 2));

  res.json({ message: "Comment added", comment: commentData });
});

app.get("/api/comments", (req, res) => {
  const dataFile = "comments.json";
  let existing = [];

  if (fs.existsSync(dataFile)) {
    const raw = fs.readFileSync(dataFile);
    existing = JSON.parse(raw);
  }

  res.json(existing);
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

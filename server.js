const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}
app.use('/uploads', express.static(uploadsDir));

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadsDir);
  },
  filename(req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

const COMMENTS_FILE = path.join(__dirname, 'comments.json');

function readComments() {
  if (!fs.existsSync(COMMENTS_FILE)) return [];
  try {
    const data = fs.readFileSync(COMMENTS_FILE, 'utf8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function saveComments(comments) {
  fs.writeFileSync(COMMENTS_FILE, JSON.stringify(comments, null, 2));
}

app.get('/api/comments', (req, res) => {
  const comments = readComments();
  res.json(comments);
});

app.post('/api/comments', upload.single('photo'), (req, res) => {
  const { name, text } = req.body;
  if (!name || !text || !req.file) {
    return res.status(400).json({ message: 'Name, text and photo are required.' });
  }

  const comments = readComments();

  const newComment = {
    id: Date.now(),
    name,
    text,
    photo: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`,
    createdAt: new Date().toISOString(),
  };

  comments.push(newComment);
  saveComments(comments);

  res.status(201).json(newComment);
});

app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(400).json({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

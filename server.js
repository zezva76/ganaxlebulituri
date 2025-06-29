const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3001;


app.use(cors());
app.use(express.json());

// ფაილების შენახვის ფოლდერი
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}
app.use('/uploads', express.static(uploadsDir));

// multer-ის კონფიგურაცია
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadsDir);
  },
  filename(req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({
  storage,
  fileFilter(req, file, cb) {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only images are allowed'));
    }
    cb(null, true);
  },
  limits: { fileSize: 5 * 1024 * 1024 } // მაქსიმუმ 5MB
});

const COMMENTS_FILE = path.join(__dirname, 'comments.json');

function readComments() {
  if (!fs.existsSync(COMMENTS_FILE)) return [];
  try {
    const data = fs.readFileSync(COMMENTS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (e) {
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
  console.log('Incoming request body:', req.body);
  console.log('Incoming file:', req.file);

  const { name, text } = req.body;
  if (!name || !text || !req.file) {
    console.log('Missing name, text or photo!');
    return res.status(400).json({ message: 'Name, text and photo are required.' });
  }

  const comments = readComments();

  const newComment = {
    id: Date.now(),
    name,
    text,
    photo: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`,
    createdAt: new Date().toISOString()
  };

  comments.push(newComment);
  saveComments(comments);

  res.status(201).json(newComment);
});

// Error handling middleware
app.use((err, req, res, next) => {
  if (err) {
    console.error('Error:', err.message);
    return res.status(400).json({ message: err.message });
  }
  next();
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});

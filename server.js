// express: framework
const express = require('express');
const app = express();

// cors: share API
const cors = require('cors');
app.use(cors());

// mongoose: database
const mongoose = require('mongoose');
const db = "mongodb+srv://abc:j2aJ7TFp8tj6GJRw@comp1842-demo.bcyxdlt.mongodb.net/books-collection";
mongoose.connect(db)
   .then(() => console.log('Connection to database established'))
   .catch(err => console.error(err));

// body-parser: input data
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const fs = require('fs');
const path = require('path');

// Ensure the uploads folder exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
   fs.mkdirSync(uploadDir);
}

// multer: file uploads
const multer = require('multer');

// Set storage engine for Multer
const storage = multer.diskStorage({
   destination: './uploads/',
   filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
   }
});

// Initialize upload with Multer
const upload = multer({
   storage: storage,
   limits: { fileSize: 1000000 }, // 1MB limit
   fileFilter: function (req, file, cb) {
      checkFileType(file, cb);
   }
}).single('file');

// Check file type (e.g., jpg, png, etc.)
function checkFileType(file, cb) {
   const filetypes = /jpeg|jpg|png|gif/;
   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
   const mimetype = filetypes.test(file.mimetype);

   if (mimetype && extname) {
      return cb(null, true);
   } else {
      cb('Error: Images Only!');
   }
}

// Route for handling file uploads
app.post('/upload', (req, res) => {
   upload(req, res, (err) => {
      if (err) {
         res.status(400).json({ error: err });
      } else {
         if (req.file === undefined) {
            res.status(400).json({ error: 'No file selected' });
         } else {
            res.json({ url: `/uploads/${req.file.filename}` });
         }
      }
   });
});

// Serve static files from the "uploads" directory
app.use('/uploads', express.static('uploads'));

// router: web link
const bookRouter = require('./api/routes/bookRouter');
bookRouter(app);

// run server: by listening port
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server running on port ${port}`));

const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: (req, res, file) => {
    console.log("hello");
    cb(null, "../files");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

module.exports = upload;

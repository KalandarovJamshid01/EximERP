const multer = require("multer");
const path = require("path");
const Document = require("./../model/document");
const { v4: uuid4 } = require("uuid");

let storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./files/"),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

let upload = multer({
  storage,
  limits: { fileSize: 1000000 * 100 },
}).fields([
  {
    name: "tip_rejim",
    maxCount: 1,
  },
  {
    name: "invoice",
    maxCount: 1,
  },
]);

const addFile = async (req, res) => {
  //Storage file
  upload(req, res, async (err) => {
    //Validate request

    if (!req.files) {
      return res.json({ error: "All fileds are required" });
    }

    if (err) {
      return res.status(500).json({ error: err.message });
    }

    for (file in req.files) {
      console.log(file);
      console.log(req.files[file][0].filename);
    }
    // Store in Database

    // const file = new Document({
    //   filename: req.files.filename,
    //   uuid: uuid4(),
    //   path: req.file.path,
    //   size: req.file.size,
    // });
    // const response = await file.save();
    // return res.json({
    //   file: `${process.env.APP_BASE_URL}/files/${response.uuid}`,
    // });
    return res.json({
      message: "Success",
    });
  });
};

module.exports = { addFile };

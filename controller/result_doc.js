const multer = require("multer");
const path = require("path");
const Result = require("../model/resultDocs.js");
const Document = require("./../model/document");
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
}).single("file");

const addFile = async (req, res) => {
  //Storage file
  try {
    upload(req, res, async (err) => {
      //Validate request

      if (!req.file) {
        return res.json({ error: "All fileds are required" });
      }

      if (err) {
        return res.status(500).json({ error: err.message });
      }

      const file = new Result({
        document_id: req.params.id,
        file: req.file.filename,
        comment: req.body.comment,
      });
      const response = await file.save();
      await Document.findByIdAndUpdate(req.params.id, {
        doc_status: req.body.doc_status,
      });
      return res.json({
        message: "Success",
        response,
      });
    });
  } catch (err) {
    return res.json(err);
  }
};

getResDoc = async (req, res, next) => {
  try {
    const document = await Result.findById(req.params.id);

    return res.status(200).json(document);
  } catch (error) {
    return res.json(error);
  }
};
const downloadFile = async (req, res) => {
  console.log("hello");

  const filePath = `files/${req.params.doc_file}`;
  res.download(filePath);
};

const allResults = async (req, res) => {
  const all = await Result.find();

  res.json({
    message: "success",
    all,
  });
};
module.exports = { addFile, downloadFile, getResDoc, allResults };
